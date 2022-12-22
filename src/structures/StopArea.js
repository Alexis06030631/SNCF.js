const {dateToNavitiaDate} = require("../util/Converter");
const StructuresManager = require("./StructuresManager");
module.exports = class StopArea extends StructuresManager{
    constructor(Client, data) {
        super()
        Object.defineProperty(this, "client", {value: Client})
        /**
         * Return the stop area id
         * @returns {string}
         */
        this.id = data.id

        /**
         * Return the stop area name
         * @returns {string}
         */
        this.name = data.name

        /**
         * Return the stop area zip code
         * @returns {object}
         */
        this.coord = data.coord

        /**
         * Return the Administative Region of the stop area (if exist)
         * @returns {AdministrativeRegion|null}
         */
        this.administrative_region = data.administrative_regions ? new this.class_administrative_region(this.client, data.administrative_regions[0]) : null

        /**
         * Return the stop area timezone
         * @returns {string}
         */
        this.timezone = data.timezone
    }

    /**
     * Get the departures of the stop area
     * @param {date} date - The date of the departures
     * @returns {Promise<Departure[]>}
     */
    departures(date= new Date()) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/departures`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.departures.map(departure => new this.class_departure(this.client, departure)))
            }
        })
    }

    /**
     * Get the arrivals of the stop area
     * @param {date} date - The date of the arrivals
     */
    arrivals(date= new Date()) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/arrivals`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.arrivals.map(arrival => new this.class_arrival(this.client, arrival)))
            }
        })
    }
}

/**
 * @typedef {object} Coord

 * @property {number} lat
 * @property {number} lon
 */

// JSDoc for IntelliSense purposes
/**
 * @type {Coord}
 * @ignore
 */


