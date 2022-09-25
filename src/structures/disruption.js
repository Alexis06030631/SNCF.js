const Client = require("../managers/ClientManager");
const moment = require("moment");

module.exports = class Disruption extends Client{
    #data

    constructor(data) {
        super()
        this.#data = data

        /**
         * Return the id of the disruption
         * @returns {string}
         */
        this.id = data.id

        /**
         * Return the status of the disruption
         * @returns {string}
         */
        this.status = data.status

        /**
         * Return the cause of the disruption
         * @returns {string}
         */
        this.cause = data.cause

        /**
         * Return the date on which the disruption was updated
         * @returns {string}
         */
        this.updated_at = this.utils.navitia_date(data.updated_at).toDate()

        /**
         * Return the list messages of the raison of this disruption
         * @returns {array}
         */
        this.messages = data.messages?.map(e => e.text) || []

        /**
         * Return if the journey is canceled or not
         * @returns {boolean}
         */
        this.canceled = data.severity?.name?.includes('canceled')

        /**
         * Return if the journey is delayed or not
         * @returns {boolean}
         */
        this.delayed = data.severity?.name?.includes('delayed')

        /**
         * Return the delay at the departure
         * @returns {string}
         */
        this.departure_delay = this.delayed? this.impacted_stops[0].departure.delay : null

        /**
         * Return the delay at the arrival
         * @returns {string}
         */
        this.arrival_delay = this.delayed? this.impacted_stops[this.impacted_stops.length - 1].arrival.delay : null

        /**
         * Return the delay of the disruption
         * @returns {string}
         */
        this.delay = null

        /**
         * Return if the journey the severity effect
         * @returns {string}
         */
        this.effect = data.severity?.effect
    }

    /**
     * Return the list of impacted objects
     * @returns {array}
     */
    get impacted_objects() {
        return this.#data.impacted_objects.map(impacted_object => {
            return {
                id: impacted_object.pt_object.id,
                trip_id: impacted_object.pt_object.trip?.name,
                type: impacted_object.pt_object.embedded_type
            }
        })
    }

    /**
     * Return the list of impacted stops
     * @returns {array}
     */
    get impacted_stops() {
        const impacted_stops = []
        if(this.canceled) return {error: 'This trip is canceled'}
        this.#data.impacted_objects.forEach(impacted_object => {
            impacted_object.impacted_stops.forEach(impacted_stop => {
                impacted_stops.push(
                    {
                        id: impacted_stop.stop_point.id,
                        name: impacted_stop.stop_point.name,
                        arrival: {
                            base: moment(impacted_stop.base_arrival_time, 'HHmmss').format('HH:mm:ss'),
                            realtime: moment(impacted_stop.amended_arrival_time, 'HHmmss').format('HH:mm:ss'),
                            delay: moment.utc(moment(impacted_stop.amended_departure_time, 'HHmmss').diff(moment(impacted_stop.base_departure_time, 'HHmmss'))).format('HH:mm:ss')
                        },
                        departure: {
                            base: moment(impacted_stop.base_departure_time, 'HHmmss').format('HH:mm:ss'),
                            realtime: moment(impacted_stop.amended_departure_time, 'HHmmss').format('HH:mm:ss'),
                            delay: moment.utc(moment(impacted_stop.amended_departure_time, 'HHmmss').diff(moment(impacted_stop.base_departure_time, 'HHmmss'))).format('HH:mm:ss')
                        },
                        cause: impacted_stop.cause,
                    }
                )
            })
        })
        return impacted_stops
    }
}
