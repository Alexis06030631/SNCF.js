const Client = require("../managers/ClientManager");

module.exports = class StopArea extends Client{
    constructor(data) {
        super()

        this.id = data.id
        this.name = data.name
        this.zip_code = data.administrative_regions[0].zip_code
        this.timezone = data.timezone
        this.coord = data.coord
    }
}
