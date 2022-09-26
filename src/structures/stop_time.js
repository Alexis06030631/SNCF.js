const Client = require("../managers/ClientManager");
const moment = require("moment");
module.exports = class StopTime extends Client {
    #data
    constructor(data) {
        super()
        this.#data = data

        /**
         * Return the id of the stop point
         * @returns {string}
         */
        this.id = data?.stop_point?.id

        /**
         * Return the name of the stop point
         * @returns {string}
         */
        this.name = data?.stop_point?.name


        /**
         * Return the departure time of the train stop
         * @returns {date}
         */
        this.departure_date = this.#transformDate(data.departure_time)

        /**
         * Return the arrival time of the train stop
         * @returns {date}
         */
        this.arrival_date = this.#transformDate(data.arrival_time)
    }

    get #transformDate() {
        return (date) => {
            return moment(this.#data.date + ' ' + date, 'YYYY-MM-DD  HHmmss').toDate()
        }
    }
}