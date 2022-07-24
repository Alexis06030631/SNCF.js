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
}