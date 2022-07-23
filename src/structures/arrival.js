const {Client} = require("../../index");

module.exports = class Arrival extends Client{
    #arrival
    constructor(arrival) {
        super()
        this.#arrival = arrival;

        this.arrival_date_time = arrival.stop_date_time.arrival_date_time;
        this.base_arrival_date_time = arrival.stop_date_time.base_arrival_date_time;

    }

    /**
     * Get the stop arrival data
     * @returns {StopArea}
     */
    get stop_area() {
        return new this.structures.stop_area(this.#arrival.stop_point.stop_area);
    }

    /**
     * Get the line data
     * @returns {Line}
     */
    get line() {
        return new this.structures.line(this.#arrival.route.line)
    }

    /**
     * Return boolean if the train is in late
     * @returns {boolean}
     */
    get isLate() {
        return this.#arrival.stop_date_time.arrival_date_time !== this.#arrival.stop_date_time.base_arrival_date_time
    }

}