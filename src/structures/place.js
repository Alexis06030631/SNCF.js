const StopSchedules = require("./stop_schedules");
const {Client} = require("../../index");

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
        return new this.structures.stop_area(this.data.stop_area)
    }

    get stop_point() {
        return this.#data.stop_point
    }
}