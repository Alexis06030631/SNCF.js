module.exports = class StructuresManager {
    constructor() {

        /**
         * @returns {Departure}
         */
        this.departure = require("./departure");

        /**
         * @returns {Arrival}
         */
        this.arrival = require("./arrival");

        /**
         * @returns {Line}
         */
        this.line = require("./line");

        /**
         * @returns {Vehicle}
         */
        this.vehicle = require("./vehicle");

        /**
         * @returns {Journey}
         * @type {Journey}
         */
        this.journey = require("./journey");

        /**
         * @returns {Disruption}
         */
        this.disruption = require("./disruption");

        /**
         * @returns {StopTime}
         */
        this.stop_time = require("./stop_time");

        /**
         * @returns {StopArea}
         */
        this.stop_area = require("./StopArea");

        /**
         * @returns {Place}
         */
        this.place = require("./place");
    }
};