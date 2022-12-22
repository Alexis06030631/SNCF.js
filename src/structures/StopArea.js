const {dateToNavitiaDate} = require("../util/Converter");
const StructuresManager = require("./StructuresManager");
const {isValidID} = require("../util/Validator");
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
        if(data.timezone) this.timezone = data.timezone
    }

    /**
     * Get the departures of the stop area
     * @param {Date} date - The date of the departures
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
     * @param {Date} date - The date of the arrivals
     * @returns {Promise<Arrival[]>}
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

    /**
     * Get Journeys from the stop area
     * @param {string} [to] - The id or name of the destination
     * @param {Date} [date] - The date of the journey
     * @returns {Promise<Journey[]>}
     */
    journeys(to, date= new Date()) {
        return new Promise(async (resolve, reject) => {
            if(to && !isValidID(to)) {
                const place = await this.client.place.search(to)
                if(place.stop_areas[0]) to = place.stop_areas[0].id
                else if(place.administrative_regions[0]) to = place.administrative_regions[0].id
            }
            let options = {datetime: dateToNavitiaDate(date)}
            if(to) options.to = to
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/journeys`, options)
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.journeys.map(journey => new this.class_journey(this.client, journey)))
            }
        })
    }

    /**
     * Get the lines of the stop area
     * @returns {Promise<Line[]>}
     */
    lines() {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/lines`)
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.lines.map(line => new this.class_line(this.client, line)))
            }
        })
    }

    /**
     * Get the routes of the stop area
     * @returns {Promise<Route[]>}
     */
    routes() {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/routes`)
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.routes.map(route => new this.class_route(this.client, route)))
            }
        })
    }

    /**
     * Get vehicle journeys of the stop area
     * @param {Date} [date] - The date of the vehicle journeys
     * @returns {Promise<VehicleJourney[]>}
     */
    vehicle_journeys(date= new Date()) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`stop_areas/${this.id}/vehicle_journeys`, {from_datetime: dateToNavitiaDate(date)})
            if(request.error) {
                reject(request.error)
            }else {
                resolve(request.vehicle_journeys.map(vehicle_journey => {
                    vehicle_journey.disruptions.forEach(disruption => {
                        if(request.disruptions.map(disruption => disruption.id).includes(disruption.id)) {
                            vehicle_journey.disruptions[vehicle_journey.disruptions.indexOf(disruption)] = request.disruptions.find(disruption2 => disruption2.id === disruption.id)
                        }
                    })
                    return new this.class_vehicle(this.client, vehicle_journey)
                }))
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


