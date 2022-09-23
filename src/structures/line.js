const Client = require("../managers/ClientManager");

module.exports = class Line extends Client{
    constructor(data) {
        super();

        /**
         * the network of the line
         * @returns {object}
         */
        this.network = data.network

        /**
         * Return the routes of the line
         * @returns {array}
         */
        this.routes = data.routes

        /**
         * Return the list of physical mode used by the line
         * @returns {array}
         */
        this.physical_modes = data.physical_modes

        /**
         * Return when the closing time of the line
         * @returns {string}
         */
        this.closing_time = data.closing_time

        /**
         * Return when the opening time of the line
         * @returns {string}
         */
        this.opening_time = data.opening_time

        /**
         * Return the name of the line
         * @returns {string}
         */
        this.name = data.name

        /**
         * Return the id of the line
         * @returns {string}
         */
        this.id = data.id

    }

    /**
     * Get the vehicles of the line at a given time
     * @param {string||Date||number} [since_date] defines the start date to search for vehicles
     * @param {string||Date||number} [until_date] defines the end date to search for vehicles
     * @param {number} [count=10] The number of vehicles to get
     * @returns {Promise<Vehicle[]>}
     */
    async vehicle_journeys(since_date, until_date, count= 10) {
        let paramsDates = this.utils.date_options(since_date, until_date);

        return this._VehicleMany(await this.utils.request(`lines/${this.id}/vehicle_journeys?${paramsDates}count=${count}`))
    }

    /**
     * Get the stop areas of the line
     * @returns {Promise<Place[]>}
     */
    async stop_areas() {
        return this._StopAreasMany(await this.utils.request(`lines/${this.id}/stop_areas`))
    }


    /**
     * Get the departure of the line at a given time
     * @param {string||Date||number} [from_date] defines the start date to search departures
     * @param {string||Date||number} [until_date] defines the end date to search departures
     * @param {number} [count=10] The number of departures to get
     * @returns {Promise<Vehicle[]>}
     */
    async departures(since_date, until_date, count= 10) {
        let paramsDates = this.utils.date_options(since_date, until_date, "from_datetime", "until_datetime");

        return this._DeparturesMany(await this.utils.request(`lines/${this.id}/departures?${paramsDates}count=${count}`))
    }

    /**
     * Get the arrivals of the line at a given time
     * @param {string||Date||number} [from_date] defines the start date to search arrivals
     * @param {string||Date||number} [until_date] defines the end date to search arrivals
     * @param {number} [count=10] The number of arrivals to get
     * @returns {Promise<Vehicle[]>}
     */
    async arrivals(since_date, until_date, count= 10) {
        let paramsDates = this.utils.date_options(since_date, until_date, "from_datetime", "until_datetime");

        return this._ArrivalsMany(await this.utils.request(`lines/${this.id}/arrivals?${paramsDates}count=${count}`))
    }

    _ArrivalsMany(arrivals) {
        const arrivalsMany = [];
        for(let arrival of arrivals.arrivals) {
            arrivalsMany.push(new this.structures.arrival(arrival))
        }
        return arrivalsMany
    }

    _DeparturesMany(departures) {
        const departuresMany = [];
        for(let departure of departures.departures) {
            departuresMany.push(new this.structures.departure(departure))
        }
        return departuresMany
    }

    _StopAreasMany(stop_areas) {
        const stop_areasMany = [];
        for(let stop_area of stop_areas.stop_areas) {
            stop_areasMany.push(new this.structures.stop_area(stop_area))
        }
        return stop_areasMany
    }

    _VehicleMany(vehicles) {
        const vehiclesMany = [];
        for(let vehicle of vehicles.vehicle_journeys) {
            vehicle.lineName = this.name;
            vehiclesMany.push(new this.structures.vehicle(vehicle))
        }
        return vehiclesMany
    }
}