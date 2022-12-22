module.exports = class StopSchedules {
    #token
    #date_times
    constructor(data, token) {
        this.#token = token
        this.#date_times = data.date_times

        /**
         * The additional information given by SNCF
         * @returns {object}
         */
        this.additional_informations = data.additional_informations

        /**
         * Return the network data
         * @returns {object}
         */
        this.network = data.display_informations.network

        /**
         * Return the direction of the train
         * @returns {string}
         */
        this.direction = data.display_informations.direction

        /**
         * Return the name of the line
         * @returns {object}
         */
        this.name = data.display_informations.name

        /**
         * Return the route schedule
         * @returns {object}
         */
        this.route = data.route


        this.departure = {}

        /**
         * Return the departure schedule of the train stop
         * @returns {string}
         */
        this.departure.scheduled = data.first_datetime?.base_date_time

        /**
         * Return the departure of the train stop
         * @returns {string}
         */
        this.departure.current = data.first_datetime?.date_time

        /**
         * Return the departure type of the train stop
         * @returns {string}
         */
        this.departure.type = data.first_datetime?.data_freshness

        this.arrival = {}

        /**
         * Return the arrival schedule of the train stop
         * @returns {string}
         */
        this.arrival.scheduled = data.last_datetime?.base_date_time

        /**
         * Return the arrival of the train stop
         * @returns {string}
         */
        this.arrival.current = data.last_datetime?.date_time

        /**
         * Return the departure type of the train stop
         * @returns {string}
         */
        this.arrival.type = data.last_datetime?.data_freshness
    }

    /**
     * Returns the stop dates of this stop schedule
     * @returns {array}
     */
    stops_dates() {
        const dates = []
        this.#date_times.forEach(date_time => {
            dates.push({additional_informations: date_time.additional_informations, scheduled: date_time.base_date_time, current:date_time.date_time, destination_id: date_time.links.find(link => link.category === 'terminus')?.id})
        })
        return dates
    }
}

// TODO: Add routes