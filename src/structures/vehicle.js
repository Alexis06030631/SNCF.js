const Client = require("../managers/ClientManager");

module.exports = class Vehicle extends Client{
    constructor(data) {
        super()

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
         * Return stops of the vehicle
         */
        this.stop_times = data.stop_times.sort((a,b) => a.arrival_time - b.departure_time)

        /**
         * Return the vehicle network
         * @returns {object}
         */
        this.network = data.network

        /**
         * Return the list of the disruptions id
         * @returns {array<string>}
         */
        this.disruptions_id = data.disruptions?.map(e => e.id) || []
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
