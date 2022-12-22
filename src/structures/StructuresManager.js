module.exports = class StructuresManager {
    constructor() {}

    /**
     * Get departure constructor
     * @returns {Class<Departure>}
     */
    get class_departure() {
        return require("./Departure");
    }

    /**
     * Get arrival constructor
     * @returns {Class<Arrival>}
     */
    get class_arrival() {
        return require("./Arrival");
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
     * Get Journey constructor
     * @returns {Class<Journey>}
     */
    get class_journey() {
        return require("./Journey");
    }

    /**
     * Get Step constructor
     * @returns {Class<Step>}
     */
    get class_step() {
        return require("./Step");
    }
};