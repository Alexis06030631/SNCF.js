const utils = require("./utils/utils");
const Place = require("./data/place");
const Disruption = require("./data/disruption");

module.exports = class Disruptions {
    #token
    constructor(token) {
        this.#token = token;
    }


    /**
     * Search the disruptions
     * @param {String||Date} since defines the start date of the disruptions to search for
     * @param {String||Date} until defines the end date of the disruptions to search for
     * @returns {Promise<Disruption[]>} The disruptions found
     * */
    async search(since, until) {
        // Check if the dates are valid
        if(since) since = utils.check_date(since);
        else since = utils.check_date(new Date());

        if(until) until = utils.check_date(until);
        else until = utils.check_date(new Date(since), 1);


        return this._disruptionsMany(await utils.request(this.#token, `disruptions/?since=${utils.to_nativia_date(since)}&until=${utils.to_nativia_date(until)}`))
    }

    /**
     * Get a place by id
     * @param stationID
     * @returns {Promise<Place>}
     */
    async get(stationID){
        if(stationID.length === 0) {
            throw new Error(Error.code.ID_MISSING)
        }else if(!stationID.includes('stop_area:SNCF:')){
            if(isNaN(Number(stationID))) {
                throw new Error(Error.code.ID_IS_NOT_A_NUMBER)
            }
            stationID = `stop_area:SNCF:${stationID}`
        }

        return new Place((await utils.request(this.#token, `places/${stationID}`)).places[0], this.#token)
    }




    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new Disruption(disruption, this.#token))
        }
        return linesMany
    }
}