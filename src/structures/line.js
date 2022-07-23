const Client = require("../managers/ClientManager");

module.exports = class Line extends Client{
    constructor(data) {
        super();

        this.network = data.network
        this.routes = data.routes
        this.physical_modes = data.physical_modes
        this.closing_time = data.closing_time
        this.opening_time = data.opening_time
        this.name = data.name
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
        let {since, until} = this.utils.date_options(since_date, until_date);

        return this._VehicleMany(await this.utils.request(`lines/${this.id}/vehicle_journeys?since=${since}&until=${until}&count=${count}`))
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
    async departures(from_date, until_date, count= 10) {
        let {since, until} = this.utils.date_options(from_date, until_date);

        return this._DeparturesMany(await this.utils.request(`lines/${this.id}/departures?from_datetime=${since}&until_datetime=${until}&count=${count}`))
    }

    /**
     * Get the arrivals of the line at a given time
     * @param {string||Date||number} [from_date] defines the start date to search arrivals
     * @param {string||Date||number} [until_date] defines the end date to search arrivals
     * @param {number} [count=10] The number of arrivals to get
     * @returns {Promise<Vehicle[]>}
     */
    async arrivals(from_date, until_date, count= 10) {
        let {since, until} = this.utils.date_options(from_date, until_date);

        return this._ArrivalsMany(await this.utils.request(`lines/${this.id}/arrivals?from_datetime=${since}&until_datetime=${until}&count=${count}`))
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
            vehiclesMany.push(new this.structures.vehicle(vehicle))
        }
        return vehiclesMany
    }
}