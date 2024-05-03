import {CachedManager} from "./";
import {Vehicle} from "../structures";
import {ErrorCodes, SncfjsError} from "../errors";
import {dateToNavitiaDate} from "../util";
export class SearchManager extends CachedManager {
    /**
     * @internal
     */
    client: any;
    constructor(client:any) {
        super()
        Object.defineProperty(this, "client", {value: client})
    }


    /**
     * Search a train by headsign ID
     * @param headsign - The headsign of the line
     * @param date - Not required, but highly recommended for effective results
     *
     * @example
     * This example shows how to search a line by name
     * ```javascript
     * const vehicle = await sncf.searchManager.searchTrain('123456', date)
     * console.log(vehicle)
     * ```
     * */
    async searchTrain(headsign:string, date?:Date):Promise<Vehicle> {
        return new Promise(async (resolve, reject) => {
            const params:any = {headsign: headsign, count:1}
            if(date && date instanceof Date) {
                date.setHours(0)
                date.setMinutes(0)
                params.since = dateToNavitiaDate(date)
                date.setDate(date.getDate()+1)
                params.until = dateToNavitiaDate(date)
            }
            const request = await this.client.requestManager.request(`vehicle_journeys`, params)
            if(request.error) {
                return reject(request.error)
            }else {
                if(!request?.vehicle_journeys.length) return reject(new SncfjsError(ErrorCodes.HeadSignNotFound, headsign))
                const vehicle:any = (request.vehicle_journeys)[0]
                vehicle.disruptions.forEach((disruption:any) => {
                    if(request.disruptions.map((disruption:any) => disruption.id).includes(disruption.id)) {
                        vehicle.disruptions[vehicle.disruptions.indexOf(disruption)] = request.disruptions
                            .find((disruption2:any) => disruption2.id === disruption.id)
                    }
                })
                return resolve(new Vehicle(this.client, vehicle))
            }
        })
    }
}