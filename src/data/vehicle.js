const axios = require("axios");
const utils = require("../utils");
const Disruptions = require("./disruptions");
const Line = require("./line");
module.exports = class Vehicle {
    #token
    #impacted_objects

    constructor(data, token) {
        this.#token = token
        this.id = data.id
        this.name = data.name
        this.network = data.network
        this.disruptions_id = data.disruptions?.map(e => e.id) || []
    }

    async disruptions() {

        let disruptions
        for(let id of this.disruptions_id) {
            await axios({
                method: 'GET',
                url: utils.SNCFapi + `disruptions/${id}/`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                disruptions = this._disruptionsMany(res.data)
            }).catch(err => {
                utils.error(err)
            })
        }
        return disruptions
    }

    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new Disruptions(disruption, this.#token))
        }
        return linesMany
    }
}
