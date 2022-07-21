const Vehicle = require("./vehicle");
const utils = require("../utils/utils");
module.exports = class Line {
    #token
    constructor(data, token) {
        this.#token = token
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
        let {since, until} = utils.date_options(since_date, until_date);

        return this._VehicleMany(await utils.request(this.#token, `lines/${this.id}/vehicle_journeys?since=${since}&until=${until}&count=${count}`))
    }

    _VehicleMany(vehicles) {
        const vehiclesMany = [];
        for(let vehicle of vehicles.vehicle_journeys) {
            vehiclesMany.push(new Vehicle(vehicle, this.#token))
        }
        return vehiclesMany
    }
}