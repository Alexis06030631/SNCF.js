const Client = require("../Client");

module.exports = class Vehicle extends Client{
    constructor(data) {
        super()
        this.id = data.id
        this.name = data.name
        this.network = data.network
        this.disruptions_id = data.disruptions?.map(e => e.id) || []
    }

    async disruptions() {

        let disruptions
        for(let id of this.disruptions_id) {
            disruptions = this._disruptionsMany(await this.utils.request(`disruptions/${id}/`))
        }
        return disruptions
    }

    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new this.structures.disruption(disruption))
        }
        return linesMany
    }
}
