const utils = require("../utils");
const Line = require("./line");
const StopSchedules = require("./stop_schedules");
const Vehicle = require("./vehicle");

module.exports = class Place {
    #token
    constructor(data, token) {
        this.#token = token
        this.embedded_type = data.embedded_type
        this.stop_area = data.stop_area
        this.stop_point = data.stop_point
        this.quality = data.quality
        this.name = data.name
        this.id = data.id
    }


    /**
     * Get the departures of the place
     * @param {Number} count The number of departures to get
     * @returns {Promise<[]>}
     * */
    async departures(count = 10) {
        if(!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)
        const data = await utils.request(this.#token, `stop_areas/${this.id}/departures?count=${count}`)

        return {disruptions: data.disruptions, departures: data.departures}
    }

    /**
     * Get the arrivals of the place
     * @param {Number} count The number of arrivals to get
     * @returns {Promise<[]>}
     * */
    async arrivals(count = 10) {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)
        const data = await utils.request(this.#token, `stop_areas/${this.id}/arrivals?count=${count}`)

        return {disruptions: data.disruptions, arrivals: data.arrivals}
    }

    /**
     * Get the commercial mode of the place
     * @returns {Promise<[]>}
     * */
    async commercial_modes() {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return (await utils.request(this.#token, `stop_areas/${this.id}/arrivals?count=${length}`)).commercial_modes
    }

    /**
     * Get the lines of the place
     * @param {Number} count The number of lines to get
     * @returns {Promise<Line[]>}
     * */
    async lines(count = 10) {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return this._linesMany(await utils.request(this.#token, `stop_areas/${this.id}/lines?count=${count}`))
    }

    /**
     * Get the networks of the place
     * @returns {Promise<[]>}
     * */
    async networks() {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return (await utils.request(this.#token, `stop_areas/${this.id}/networks`)).networks
    }

    /**
     * Get the physical modes of the place
     * @returns {Promise<[]>}
     * */
    async physical_modes() {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return (await utils.request(this.#token, `stop_areas/${this.id}/physical_modes`)).physical_modes
    }

    /**
     * Get the places nearby of the place
     * @param {Number} count The number of places to get
     * @returns {Promise<Place[]>}
     * */
    async places_nearby(count = 10) {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return this._places_nearbyMany(await utils.request(this.#token, `stop_areas/${this.id}/places_nearby?count=${count}`))
    }

    /**
     * Get the stop schedules of the place
     * @param {Number} count The number of places to get
     * @returns {Promise<StopSchedules[]>}
     * */
    async stop_schedules(count = 10) {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return this._stop_schedulesMany(await utils.request(this.#token, `stop_areas/${this.id}/stop_schedules?count=${count}`))
    }

    /**
     * Get the traffic reports of the place
     * @param {Number} count The number of places to get
     * @returns {Promise<Vehicle[]>}
     * */
    async traffic_reports(count = 10) {
        if (!this.id.includes('stop_area')) throw new Error(Error.code.NOT_A_STOP_AREA)

        return this._traffic_reportsMany(await utils.request(this.#token, `stop_areas/${this.id}/traffic_reports?count=${count}`))
    }




    // TODO: route_schedules
    // TODO: routes
    // TODO: terminus_schedules


    _traffic_reportsMany(traffic) {
        const trafficMany = [];
        for(let traffic_report of traffic.traffic_reports) {
            for(let vehicle of traffic_report.vehicle_journeys) {
                vehicle.network = traffic_report.network
                trafficMany.push(new Vehicle(vehicle, this.#token))
            }
        }
        return trafficMany
    }

    _stop_schedulesMany(stops) {
        const stop_schedulesMany = [];
        for(let stop of stops.stop_schedules) {
            stop_schedulesMany.push(new StopSchedules(stop, this.#token))
        }
        return stop_schedulesMany
    }

    _places_nearbyMany(places) {
        const linesMany = [];
        for(let place of places.places_nearby) {
            linesMany.push(new Place(place, this.#token))
        }
        return linesMany
    }

    _linesMany(lines) {
        const linesMany = [];
        for(let line of lines.lines) {
            linesMany.push(new Line(line, this.#token))
        }
        return linesMany
    }
}