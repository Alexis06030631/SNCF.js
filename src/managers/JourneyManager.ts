import {CachedManager} from "./";
import {SncfjsError, ErrorCodes} from "../errors";
import {dateToNavitiaDate} from "../util";
import {isValidID} from "../util";
import {Journey} from "../structures";
import {Disruption} from "../structures";

export class JourneyManager extends CachedManager {
    /**
     * @internal
     */
    client: any;
    constructor(client:any) {
        super()
        Object.defineProperty(this, "client", {value: client})
    }

    /**
     * Get a journey details with departure and arrival stop areas ids
     * @param from - The departure stop area id or name
     * @param to - The arrival stop area id or name
     * @param date - The date of the journey to get
     *
     * @example
     * This example shows how to get a journey using the departure and arrival stop areas names
     * ```javascript
     * const journey = await client.journey.get("Paris", "Bordeaux")
     * console.log(journey)
     * ```
     *
     * @example
     * This example shows how to get a journey using the departure and arrival stop areas ids
     * ```javascript
     * const journey = await client.journey.get("stop_area:SNCF:87611004", "stop_area:SNCF:87686006")
     * console.log(journey)
     * ```
     */
    async get(from:string, to:string, date:Date=new Date()):Promise<Journey>{
        return new Promise(async (resolve, reject) => {
            if(!from || !to) {
                const missing:any = []
                if(!from) missing.push("from")
                if(!to) missing.push("to")
                return reject(new SncfjsError(ErrorCodes.MissingParameter, missing.join(" and "), missing.length > 1))
            }
            if(!isValidID(from)) {
                const place = await this.client.place.search(from)
                if(place.stop_areas[0]) from = place.stop_areas[0].id
                else if(place.administrative_regions[0]) from = place.administrative_regions[0].id
            }
            if(!isValidID(to)) {
                const place = await this.client.place.search(to)
                if(place.stop_areas[0]) to = place.stop_areas[0].id
                else if(place.administrative_regions[0]) to = place.administrative_regions[0].id
            }

            const request = await this.client.requestManager.request(`journeys`, {from: from, to: to, datetime: dateToNavitiaDate(date)})
            if(request.error) {
                return reject(request.error)
            }else {
                // @ts-ignore
                return resolve(request.journeys.map(journey => {
                    if(request.disruptions) { // @ts-ignore
                        journey.disruptions = request.disruptions.map(disruption => new Disruption(this.client, disruption))
                    }
                    return new Journey(this.client, journey)
                }))
            }
        })
    }

}