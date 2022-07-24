const Client = require("../managers/ClientManager");

module.exports = class Disruption extends Client{
    #impacted_objects

    constructor(data) {
        super()

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
         * Return the routes of the disruption
         * @returns {object}
         */
        this.routes = data.routes

        /**
         * Return the severity of the disruption
         * @returns {object}
         */
        this.severity = data.severity

        /**
         * Return the periods of the disruption
         * @returns {array}
         */
        this.periods = data.application_periods

        /**
         * Return the date on which the disruption was updated
         * @returns {string}
         */
        this.updated_at = data.updated_at

        /**
         * Return the list messages of the raison of this disruption
         * @returns {array}
         */
        this.messages = data.messages?.map(e => e.text) || []

        this.#impacted_objects = data.impacted_objects
    }

    /**
     * Return the list of impacted objects
     * @returns {array}
     */
    get impacted_objects() {
        const impacted_objects = []
        this.#impacted_objects.forEach(impacted_object => {
            impacted_objects.push({id: impacted_object.pt_object.id, quality: impacted_object.pt_object.quality, name: impacted_object.pt_object.trip.name})
        })
        return impacted_objects
    }
}
