const {Client} = require("../../index");

module.exports = class Departure extends Client{
    #departure
    constructor(departure) {
        super()
        this.#departure = departure;

        this.arrival_date_time = departure.stop_date_time.departure_date_time;
        this.base_arrival_date_time = departure.stop_date_time.base_departure_date_time;

    }

    /**
     * Get the stop departure data
     * @return {StopArea}
     */
    get stop_area() {
        return new this.structures.stop_area(this.#departure.stop_point.stop_area);
    }

    /**
     * Get the line data
     * @return {Line}
     */
    get line() {
        return new this.structures.line(this.#departure.route.line)
    }

    /**
     * Return boolean if the train is in late
     * @return {boolean}
     */
    get isLate() {
        return this.#departure.stop_date_time.departure_date_time !== this.#departure.stop_date_time.base_departure_date_time
    }

}