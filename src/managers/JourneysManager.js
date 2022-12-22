const CachedManager = require("./CachedManager");
const {SncfjsError, ErrorCodes} = require("../errors");
const {dateToNavitiaDate} = require("../util/Converter");
const {isValidID} = require("../util/Validator");
const Journey = require("../structures/Journey");

module.exports = class JourneyManager extends CachedManager {
    constructor(client) {
        super()
        Object.defineProperty(this, "client", {value: client})
    }

    /**
     * Get a journey details with departure and arrival stop areas ids
     * @param {string} from The departure stop area id or name
     * @param {string} to The arrival stop area id or name
     * @param {Date} [date=now] The date of the journey to get
     * @returns {Promise<Journey[]>}
     */
    async get(from, to, date=new Date()){
        return new Promise(async (resolve, reject) => {
            if(!from || !to) {
                const missing = []
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
                return resolve(request.journeys.map(journey => new Journey(this.client, journey)))
            }
        })
    }

}