import {dateToNavitiaDate, extractDateInTripID, isValidID} from "../util";
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
    administrative_region: AdministrativeRegion | null;
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
                    .map(departure => new Departure(this.client, departure)))
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
                    .map(arrival => new Arrival(this.client, arrival)))
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
                        .map(disruption => new Disruption(this.client, disruption))
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
                    .map(line => new Line(this.client, line)))
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
                    .map(route => new Route(this.client, route)))
            }
        })
    }

    /**
     * Get vehicle journeys of the stop area
     * @param since - The start date of the vehicle journeys to get
     * @param until - The end date of the vehicle journeys to get (default: since + 1 day)
     */
    vehicle_journeys(since:Date= new Date(), until:Date= new Date(since.getTime() + 86400000)): Promise<Vehicle[]> {
        return new Promise(async (resolve, reject) => {
            if(since > until) return reject(new Error("The since date must be before the until date"))
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/vehicle_journeys`, {since: dateToNavitiaDate(since), until: dateToNavitiaDate(until)})
            if(request.error) {
                reject(request.error)
            }else {
                const date = since
                resolve(request.vehicle_journeys.map((vehicle_journey:any) => {
                    vehicle_journey.disruptions.forEach((disruption:any) => {
                        if(request.disruptions.map((disruption:any) => disruption.id).includes(disruption.id)) {
                            vehicle_journey.disruptions[vehicle_journey.disruptions.indexOf(disruption)] = request.disruptions
                                .find((disruption2:any) => disruption2.id === disruption.id)
                        }
                    })
                    return new Vehicle(this.client, vehicle_journey)
                }))
            }
        })
    }
}
