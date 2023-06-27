import {CachedManager} from "./";
import {Disruption} from "../structures";

export class DisruptionManager extends CachedManager {
    /**
     * @internal
     */
    client: any;
    constructor(client:any) {
        super()
        Object.defineProperty(this, 'client', { value: client });
    }


    /**
     * Search the disruptions
     * @param since_date - Defines the start date of the disruptions to search for
     * @param until_date - Defines the end date of the disruptions to search for
     * @example
     * This example shows all the disruptions from yesterday to today
     * ```javascript
     * const {Client} = require('SNCF.js');
     *
     * const client = new Client();
     * client.disruptions.search(new Date(Date.now() - 86400000), new Date())
     *    .then(disruptions => {
     *    console.log(disruptions)
     *    })
     *    .catch(console.error)
     * ```
     * */
    async search(since_date?:Date, until_date?:Date):Promise<Disruption[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`disruptions`, {since_date: since_date, until_date: until_date})
            if(request.error) {
                return reject(request.error)
            }else { // @ts-ignore
                resolve(request.disruptions.map(disruption => new Disruption(this.client, disruption)))
            }
        })
    }

    /**
     * Get a disruption by id
     * @param disruptionID - The id of the disruption to get
     * @example
     * This example shows the disruption with the id
     * ```javascript
     * const {Client} = require('SNCF.js');
     *
     * const client = new Client();
     * client.disruptions.get('DISRUPTION_ID').then(console.log).catch(console.error)
     * ```
     */
    async get(disruptionID:string):Promise<Disruption>{
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`disruptions/${disruptionID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                return resolve(new Disruption(this.client, request.disruptions[0]))
            }
        })
    }
}