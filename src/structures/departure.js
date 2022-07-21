const Line = require("./line");

module.exports = class Departure {
    #token
    constructor(departure, token) {
        this.#token = token
        this.stop_area = {
            id: departure.stop_point.stop_area.id,
            name: departure.stop_point.stop_area.name,
        }
        this.line = (typeof Line === "function")? new Line(departure.line, this.#token) : this
    }
}