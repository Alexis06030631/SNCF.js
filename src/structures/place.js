const Client = require("../managers/ClientManager");

module.exports = class Place extends Client{
    #data
    constructor(data) {
        super()
        this.#data = data;

        /**
         * Return the type of the place
         * @returns {string}
         */
        this.type = data.embedded_type

        /**
         * Return a quality level of the place
         * @returns {number}
         */
        this.quality = data.quality

        /**
         * Return the name of the place
         * @returns {string}
         */
        this.name = data.name

        /**
         * Return the id of the place
         * @returns {string}
         */
        this.id = data.id
    }

    /**
     * Return the data of this stop area
     * @returns {StopArea}
     */
    get stop_area() {
        if(this.#data.embedded_type !== "stop_area") {
            return new Error(Error.code.INVALID_EMBEDDED_TYPE)
        }else return new this.structures.stop_area(this.#data.stop_area)
    }

    /**
     * Return the data of this stop point
     * @returns {object}
     */
    get stop_point() {
        if(this.#data.embedded_type !== "stop_point") {
            return new Error(Error.code.INVALID_EMBEDDED_TYPE)
        }else return this.#data.stop_point
    }

    /**
     * Return the vehicle journeys of this place
     * @param {string||Date||number} [since_date] defines the start date to search for vehicles
     * @param {string||Date||number} [until_date] defines the end date to search for vehicles
     * @param {number} [count=10] The number of vehicles to get
     * @returns {Promise<Vehicle[]>}
     */
    async vehicle_journeys(since_date, until_date, count= 10) {
        let paramsDates = this.utils.date_options(since_date, until_date);
        let stopParams = {name: '', value:''}

        if(this.#data.embedded_type === "stop_area") {
            stopParams.name = "stop_areas";
            stopParams.value = this.#data.stop_area.id
        }else if(this.#data.embedded_type === "stop_point") {
            stopParams.name = "stop_points";
            stopParams.value = this.#data.stop_point.id
        }else throw new Error(Error.code.INVALID_EMBEDDED_TYPE)

        let data = await this.utils.request(`${stopParams.name}/${stopParams.value}/vehicle_journeys?${paramsDates}&count=${count}`)
        return data.vehicle_journeys.map(vehicle => new this.structures.vehicle(vehicle));
    }
}