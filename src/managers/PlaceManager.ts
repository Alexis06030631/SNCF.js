import {CachedManager} from "./";
import {navitiaDateToDate} from "../util";
import {ErrorCodes} from "../errors";
import {StopArea} from "../structures";
import {AdministrativeRegion} from "../structures";

export class PlacesManager extends CachedManager {
    /**
     * @internal
     */
    client: any;
    constructor(client:any) {
        super()
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Search for a place by name
     * @param station - The name of the station to search for
     *
     * @example
     * This example shows how to search for a place by name
     * ```javascript
     * const places = await client.places.search("Paris")
     * console.log(places)
     * ```
     * */
    search(station:string):Promise<PlaceManagerResult> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`places`, {q: station})
            if(request.error) {
                return reject(request.error)
            }else resolve(this.#placesMany(request))
        })
    }

    /**
     * Get a place by id
     * @param stationID - The id of the station to get
     *
     * @example
     * This example shows how to get a place by id
     * ```javascript
     * const place = await client.places.get("stop_area:SNCF:87686006")
     * console.log(place)
     * ```
     */
    async get(stationID:string):Promise<StopArea|AdministrativeRegion>{
        return new Promise(async (resolve, reject) => {
            if(!stationID) reject(new Error(ErrorCodes.IdIsMissing))

            const request = await this.client.requestManager.request(`places/${stationID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                if(request.places[0].embedded_type === 'administrative_region') {
                    return resolve(new AdministrativeRegion(this.client, request.places[0].administrative_region))
                }else return resolve(new StopArea(this.client, request.places[0].stop_area))
            }
        })
    }

    /**
     * @internal
     */
    #placesMany(places:any) {
        const result:any = {
            date: navitiaDateToDate(places.context.current_datetime),
            administrative_regions: [],
            stop_areas: [],
        }
        if(places?.places) {
            // @ts-ignore
            for(let place of places.places.filter(place => place.embedded_type === 'stop_area')) {
                result.stop_areas.push(new StopArea(this.client,place.stop_area))
            }
            // @ts-ignore
            for (let place of places.places.filter(place => place.embedded_type === 'administrative_region')) {
                result.administrative_regions.push(new AdministrativeRegion(this.client, place.administrative_region))
            }
        }
        return result
    }
}

export interface PlaceManagerResult {
    date: Date,
    administrative_regions: AdministrativeRegion[],
    stop_areas: StopArea[]
}
