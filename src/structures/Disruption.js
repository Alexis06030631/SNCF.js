const StructuresManager = require("./StructuresManager");
const {navitiaDateToDate} = require("../util/Converter");

module.exports = class Vehicle extends StructuresManager{
    constructor(Client, data) {
        super()
        Object.defineProperty(this, 'client', {value: Client})

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
         * Return the messages of the disruption
         * @returns {array}
         */
        this.messages = data.messages.map(message => message.text)

        /**
         * Return the start date of the disruption
         * @returns {Date}
         */
        this.start = navitiaDateToDate(data.application_periods[0].begin)

        /**
         * Return the end date of the disruption
         * @returns {Date}
         */
        this.end = navitiaDateToDate(data.application_periods[0].end)

        /**
         * Return the date on which the disruption was updated
         * @returns {Date}
         */
        this.updated_at = navitiaDateToDate(data.updated_at)

        /**
         * Return if the journey is canceled or not
         * @returns {boolean}
         */
        this.canceled = data.severity?.effect === 'NO_SERVICE'

        /**
         * Return if the journey is delayed or not
         * @returns {boolean}
         */
        this.delayed = data.severity?.effect === 'SIGNIFICANT_DELAYS'

        /**
         * Return the severity of the disruption
         * @returns {Severity}
         */
        this.severity = {code: data.severity?.effect, name: data.severity?.name, priority: data.severity?.priority}

        /**
         * Return the impacted stops of the disruption
         * @returns {array<ImpactedStop>}
         */
        this.impacted_stops = data.impacted_objects[0].impacted_stops.map(impacted_object => new this.class_impacted_stop(this.client, impacted_object))

    }

}


/**
 * @typedef {Object} Severity
 * @property {string} code - The code of the severity
 * @property {string} name - The name of the severity
 * @property {string} priority - The priority of the severity
 */
/**
 * @type {Severity}
 * @ignore
 */