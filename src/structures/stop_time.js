const Client = require("../managers/ClientManager");
module.exports = class StopTime extends Client {
    #data
    constructor(data) {
        super()
        this.#data = data

        /**
         * Return the id of the stop point
         * @returns {string}
         */
        this.id = data.stop_point.id

        /**
         * Return the name of the stop point
         * @returns {string}
         */
        this.name = data.stop_point.name


        this.departure = {}

        /**
         * Return the departure time of the train stop
         * @returns {number}
         */
        this.departure.date = data.departure_time

        /**
         * Return the departure UTC time of the train stop
         * @returns {number}
         */
        this.departure.UTC_date = data.utc_departure_time


        this.arrival = {}

        /**
         * Return the arrival time of the train stop
         * @returns {number}
         */
        this.arrival.date = data.arrival_time

        /**
         * Return the arrival UTC time of the train stop
         * @returns {number}
         */
        this.departure.UTC_date = data?.utc_arrival_time
    }
}