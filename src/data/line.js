module.exports = class Line {
    #token
    constructor(data, token) {
        this.#token = token
        this.code = data.code
        this.network = data.network
        this.routes = data.routes
        this.physical_modes = data.physical_modes
        this.closing_time = data.closing_time
        this.opening_time = data.opening_time
        this.name = data.name
        this.id = data.id
    }
}