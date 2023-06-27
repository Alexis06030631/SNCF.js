import {StructuresManager} from "./StructuresManager";
import {hourNativiaToHour} from "../util";
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
     */
    departure_time: string;
    /**
     * Return the arrival time of the vehicle
     */
    arrival_time: string;
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
        this.calendar = data.calendars
            // @ts-ignore
            .map(calendar => {return new this.class_calendar(this.client, calendar)})
        this.departure_time = this.get_departure_time
        this.arrival_time = this.get_arrival_time
        this.stop_times = data.stop_times
            // @ts-ignore
            .sort((a, b) => Number(a.departure_time) - Number(b.departure_time))
            // @ts-ignore
            .map(stop_time => new this.class_stop_time(this.client, stop_time))

    }

    get get_departure_time(): string {
        // @ts-ignore
        return hourNativiaToHour(this.data.stop_times.sort((a, b) => Number(a.departure_time) - Number(b.departure_time))[0].departure_time)
    }

    get get_arrival_time(): string {
        // @ts-ignore
        return hourNativiaToHour(this.data.stop_times.sort((a, b) => Number(b.arrival_time) - Number(a.arrival_time))[0].arrival_time)
    }

    /**
     * Return the vehicle disruptions
     */
    get disruptions(): Disruption[] {
        // @ts-ignore
        return this.data.disruptions.map(disruption => {
            if(!disruption.status) disruption = this.client.disruptions.get(disruption.id)
            return new Disruption(this.client, disruption)
        })
    }
}