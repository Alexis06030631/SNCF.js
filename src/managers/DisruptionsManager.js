const CachedManager = require("./CachedManager");
const Disruption = require("../structures/Disruption");
const SncfjsErrorCodes = require("../errors/ErrorCodes");

module.exports = class DisruptionManager extends CachedManager {
    constructor(client) {
        super()
        Object.defineProperty(this, 'client', { value: client });
    }


    /**
     * Search the disruptions
     * @param {string||Date||number} [since_date] defines the start date of the disruptions to search for
     * @param {string||Date||number} [until_date] defines the end date of the disruptions to search for
     * @returns {Promise<Disruption[]>}
     * */
    async search(since_date, until_date) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`disruptions`, {since_date: since_date, until_date: until_date})
            if(request.error) {
                return reject(request.error)
            }else resolve(request.disruptions.map(disruption => new Disruption(this.client, disruption)))
        })
    }

    /**
     * Get a disruption by id
     * @param {string} disruptionID The id of the disruption to get
     * @returns {Promise<Disruption>}
     */
    async get(disruptionID){
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`disruptions/${disruptionID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                return resolve(new Disruption(this.client, request.disruptions[0]))
            }
        })
    }




    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new this.structures.disruption(disruption))
        }
        return linesMany
    }
}