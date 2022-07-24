const Client = require("../managers/ClientManager");

module.exports = class Departure extends Client{
    #departure
    constructor(departure) {
        super()
        this.#departure = departure;

        /**
         * Returns the departure time
         * @returns {string}
         */
        this.departure_date_time = departure.stop_date_time.departure_date_time;

        /**
         * Returns the default departure time
         * @returns {string}
         */
        this.base_departure_date_time = departure.stop_date_time.base_departure_date_time;

    }

    /**
     * Get the stop departure data
     * @returns {StopArea}
     */
    get stop_area() {
        return new this.structures.stop_area(this.#departure.stop_point.stop_area);
    }

    /**
     * Get the line data
     * @returns {Line}
     */
    get line() {
        return new this.structures.line(this.#departure.route.line)
    }

    /**
     * Return boolean if the train is in late
     * @returns {boolean}
     */
    get isLate() {
        return this.#departure.stop_date_time.departure_date_time !== this.#departure.stop_date_time.base_departure_date_time
    }

}