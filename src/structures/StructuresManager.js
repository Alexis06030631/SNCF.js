module.exports = class StructuresManager {
    constructor() {

        /**
         * @returns {Arrival}
         */
        //this.arrival = require("./Arrival");

        /**
         * @returns {Line}
         */
        //this.line = require("./Line");

        /**
         * @returns {Vehicle}
         */
        //this.vehicle = require("./Vehicle");

        /**
         * @returns {Journey}
         * @type {Journey}
         */
        //this.journey = require("./Journey");

        /**
         * @returns {Disruption}
         */
        //this.disruption = require("./Disruption");

        /**
         * @returns {StopTime}
         */
        //this.stop_time = require("./StopTime");

        /**
         * @returns {StopArea}
         */
        //this.stop_area = require("./StopArea");

    }

    /**
     * Get departure constructor
     * @returns {Class<Departure>}
     */
    get class_departure() {
        return require("./Departure");
    }


    /**
     * Get Place constructor
     * @returns {Class<Place>}
     */
    get class_place() {
        return require("./Place");
    }

    /**
     * Get StopArea constructor
     * @returns {Class<StopArea>}
     */
    get class_stop_area() {
        return require("./StopArea");
    }

    /**
     * Get AdministartiveRegion constructor
     * @returns {Class<AdministrativeRegion>}
     */
    get class_administrative_region() {
        return require("./AdministrativeRegion");
    }

    /**
     * Get Line constructor
     * @returns {Class<Line>}
     */
    get class_line() {
        return require("./Line");
    }

    /**
     * Get Route constructor
     * @returns {Class<Route>}
     */
    get class_route() {
        return require("./Route");
    }

    /**
     * Get StopPoint constructor
     * @returns {Class<StopPoint>}
     */
    get class_stop_point() {
        return require("./StopPoint");
    }
};