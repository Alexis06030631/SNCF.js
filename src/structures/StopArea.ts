import {dateToNavitiaDate, isValidID} from "../util";
import {Coord} from "../models";
import {AdministrativeRegion} from "./AdministrativeRegion";
import {Departure} from "./Departure";
import {Arrival} from "./Arrival";
import {Journey} from "./Journey";
import {Line} from "./Line";
import {Route} from "./Route";
import {Vehicle} from "./Vehicle";
export class StopArea{
    /**
     * The id of the stop area
     */
    id: string;
    /**
     * The name of the stop area
     */
    name: string;
    /**
     * The coord of the stop area
     */
    coord: Coord;
    /**
     * Return the Administative Region of the stop area (if exist)
     */
    administrative_region: AdministrativeRegion;
    /**
     * The timezone of the stop area
     */
    timezone: string;
    /**
     * @internal
     */
    client: any;

    constructor(Client:any, data:any) {
        Object.defineProperty(this, "client", {value: Client})

        this.id = data.id
        this.name = data.name
        this.coord = data.coord
        this.administrative_region = data.administrative_regions ? new AdministrativeRegion(this.client, data.administrative_regions[0]) : null
        if(data.timezone) this.timezone = data.timezone
    }

    /**
     * Get the departures of the stop area
     * @param date - The date of the departures
     */
    async departures(date:Date= new Date()): Promise<Departure[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/departures`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.departures
                    // @ts-ignore
                    .map(departure => new this.class_departure(this.client, departure)))
            }
        })
    }

    /**
     * Get the arrivals of the stop area
     * @param date - The date of the arrivals
     */
    arrivals(date:Date= new Date()): Promise<Arrival[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/arrivals`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.arrivals
                    // @ts-ignore
                    .map(arrival => new this.class_arrival(this.client, arrival)))
            }
        })
    }

    /**
     * Get Journeys from the stop area
     * @param to - The id or name of the destination
     * @param date - The date of the journey
     */
    journeys(to?:string, date:Date= new Date()): Promise<Journey[]> {
        return new Promise(async (resolve, reject) => {
            if(to && !isValidID(to)) {
                const place = await this.client.place.search(to)
                if(place.stop_areas[0]) to = place.stop_areas[0].id
                else if(place.administrative_regions[0]) to = place.administrative_regions[0].id
            }
            let options:any = {datetime: dateToNavitiaDate(date)}
            if(to) options.to = to
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/journeys`, options)
            if(request.error) {
                reject(request.error)
            }else {
                return resolve(request.journeys
                    // @ts-ignore
                    .map(journey => {
                    if(request.disruptions) journey.disruptions = request.disruptions
                        // @ts-ignore
                        .map(disruption => new this.class_disruption(this.client, disruption))
                    return new Journey(this.client, journey)
                }))
            }
        })
    }

    /**
     * Get the lines of the stop area
     */
    lines(): Promise<Line[]>{
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/lines`)
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.lines
                    // @ts-ignore
                    .map(line => new this.class_line(this.client, line)))
            }
        })
    }

    /**
     * Get the routes of the stop area
     */
    routes(): Promise<Route[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/routes`)
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.routes
                    // @ts-ignore
                    .map(route => new this.class_route(this.client, route)))
            }
        })
    }

    /**
     * Get vehicle journeys of the stop area
     * @param date - The date of the vehicle journeys
     */
    vehicle_journeys(date:Date= new Date()): Promise<Vehicle[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/vehicle_journeys`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.vehicle_journeys
                    // @ts-ignore
                    .map(vehicle_journey => {
                    vehicle_journey.disruptions
                        // @ts-ignore
                        .forEach(disruption => {
                        if(request.disruptions
                            // @ts-ignore
                            .map(disruption => disruption.id).includes(disruption.id)) {
                            vehicle_journey.disruptions[vehicle_journey.disruptions.indexOf(disruption)] = request.disruptions
                                // @ts-ignore
                                .find(disruption2 => disruption2.id === disruption.id)
                        }
                    })
                    return new Vehicle(this.client, vehicle_journey)
                }))
            }
        })
    }
}
