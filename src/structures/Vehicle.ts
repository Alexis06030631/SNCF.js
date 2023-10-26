import {StructuresManager} from "./StructuresManager";
import {dateWithDateAndHour, extractDateInTripID, hourNativiaToHour} from "../util";
import {Calendar} from "./Calendar";
import {StopTime} from "./StopTime";
import {Disruption} from "./Disruption";

export class Vehicle {
    /**
     * Return the vehicle id
     */
    id: string;
    /**
     * Return the vehicle headsign
     */
    headsign: string;
    /**
     * Return trip ID
     */
    trip_id: string;
    /**
     * Return boolean if the vehicle has disruptions
     */
    has_disruptions: boolean;
    /**
     * Return the calendar of the vehicle
     */
    calendar: Calendar[];
    /**
     *  Return the departure time of the vehicle
     *  @deprecated Use arrival_date instead
     */
    departure_time: string;
    /**
     * Return the arrival time of the vehicle
     * @deprecated Use arrival_date instead
     */
    arrival_time: string;
    /**
     *  Return the departure date of the vehicle
     */
    departure_date: Date;
    /**
     * Return the arrival date of the vehicle
     */
    arrival_date: Date;
    /**
     * Return the steps of the vehicle
     */
    stop_times: StopTime[];
    /**
     * @internal
     */
    data: any;
    /**
     * @internal
     */
    client: any;

    constructor(Client:any, data:any) {
        Object.defineProperty(this, "client", {value: Client})
        Object.defineProperty(this, "data", {value: data})

        this.id = data.id
        this.headsign = data.headsign
        this.trip_id = data.trip.id
        this.has_disruptions = !!data?.disruptions?.length
        this.calendar = data.calendars.map((calendar:any) => new Calendar(this.client, calendar))
        this.departure_time = this.get_departure_time
        this.arrival_time = this.get_arrival_time
        this.departure_date = dateWithDateAndHour(this.get_departure_time, extractDateInTripID(data.trip.id))
        this.arrival_date = dateWithDateAndHour(this.get_arrival_time, extractDateInTripID(data.trip.id))
        this.stop_times = data.stop_times.sort((a:any, b:any) => Number(a.departure_time) - Number(b.departure_time)).map((stop_time:any) => new StopTime(this.client, stop_time, extractDateInTripID(data.trip.id)))

    }

    get get_departure_time(): string {
        return hourNativiaToHour(this.data.stop_times.sort((a:any, b:any) => Number(a.departure_time) - Number(b.departure_time))[0].departure_time)
    }

    get get_arrival_time(): string {
        return hourNativiaToHour(this.data.stop_times.sort((a:any, b:any) => Number(b.arrival_time) - Number(a.arrival_time))[0].arrival_time)
    }

    /**
     * Return the vehicle disruptions
     */
    get disruptions(): Disruption[] {
        return this.data.disruptions.map((disruption:any) => {
            if(!disruption.status) disruption = this.client.disruptions.get(disruption.id)
            return new Disruption(this.client, disruption)
        })
    }
}