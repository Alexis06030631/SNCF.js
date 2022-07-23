const Client = require("../managers/ClientManager");

module.exports = class Place extends Client{
    #data
    constructor(data) {
        super()
        this.#data = data;

        this.embedded_type = data.embedded_type
        this.quality = data.quality
        this.name = data.name
        this.id = data.id
    }

    get stop_area() {
        if(this.#data.embedded_type !== "stop_area") {
            return new Error(Error.code.INVALID_EMBEDDED_TYPE)
        }else return new this.structures.stop_area(this.#data.stop_area)
    }

    get stop_point() {
        if(this.#data.embedded_type !== "stop_point") {
            return new Error(Error.code.INVALID_EMBEDDED_TYPE)
        }else return this.#data.stop_point
    }
}