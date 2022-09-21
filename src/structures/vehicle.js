const Client = require("../managers/ClientManager");

module.exports = class Vehicle extends Client{
    #stoptimes
    constructor(data) {
        super()
        this.#stoptimes = data.stop_times

        /**
         * Return the vehicle id
         * @returns {string}
         */
        this.id = data.id

        /**
         * Return the vehicle name
         * @returns {string}
         */
        this.name = data.name

        /**
         * Return the calendar of the vehicle
         */
        this.calendar = data.calendars

        /**
         * Return the list of the disruptions id
         * @returns {array<string>}
         */
        this.disruptions_id = data.disruptions?.map(e => e.id) || []

        /**
         * Get the vehicle direction
         * @returns {object}
         */
        this.direction = {
            start: this.stop_times[0].name,
            end: this.stop_times[this.stop_times.length - 1].name,
            train_direction: data.lineName?((data.lineName.match(/(.*) - (.*)/))[1] === this.stop_times[0].name) ? "forward" : "backward": 'unknown'
        }

    }

    /**
     * Return the stops of the vehicle
     * @returns {array<StopTimes>}
     */
    get stop_times() {
        let stopTimes = []
        for(let stoptime of this.#stoptimes.sort((a,b) => a.arrival_time - b.departure_time)) {
            stopTimes.push(new this.structures.stop_time(stoptime))
        }
        return stopTimes
    }

    /**
     * Return the vehicle disruptions
     * @returns {array<Disruption>}
     */
    async disruptions() {

        let disruptions
        for(let id of this.disruptions_id) {
            disruptions = this._disruptionsMany(await this.utils.request(`disruptions/${id}/`))
        }
        return disruptions
    }

    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new this.structures.disruption(disruption))
        }
        return linesMany
    }
}
