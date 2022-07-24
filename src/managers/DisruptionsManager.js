const CachedManager = require("./CachedManager");

module.exports = class Disruptions extends CachedManager {
    constructor(client) {
        super()

        /**
         * The utils functions.
         * @returns {Utils}
         */
        this.utils = client.utils
        /**
         * All the structures available.
         * @returns {StructuresManager}
         */
        this.structures = client.structures
    }


    /**
     * Search the disruptions
     * @param {string||Date||number} [since_date] defines the start date of the disruptions to search for
     * @param {string||Date||number} [until_date] defines the end date of the disruptions to search for
     * @param {number} [count=10] The number of disruptions to get
     * @returns {Promise<Disruption[]>} The disruptions found
     * */
    async search(since_date, until_date, count=10) {
        let {since, until} = this.utils.date_options(since_date, until_date);


        return this._disruptionsMany(await this.utils.request(`disruptions/?since=${since}&until=${until}&count=${count}`))
    }

    /**
     * Get a disruption by id
     * @param {string} disruptionID The id of the disruption to get
     * @returns {Promise<Disruption>}
     */
    async get(disruptionID){
        if(disruptionID.length === 0) {
            throw new Error(Error.code.ID_MISSING)
        }

        return new this.structures.disruption((await this.utils.request(`disruptions/${disruptionID}`)).disruptions[0])
    }




    _disruptionsMany(disruptions) {
        const linesMany = [];
        for(let disruption of disruptions.disruptions) {
            linesMany.push(new this.structures.disruption(disruption))
        }
        return linesMany
    }
}