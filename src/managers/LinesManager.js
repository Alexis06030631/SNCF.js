const CachedManager = require("./CachedManager");

module.exports = class Lines extends CachedManager {
    constructor(client) {
        super()

        // The utils functions for the client.
        this.utils = client.utils

        // The structure available for the client.
        this.structures = client.structures
    }


    /**
     * Search a line by name (departure - arrival)
     * @param {String} line The name of the line
     * @returns {Promise<Line[]>}
     * */
    async search(line) {
        return this._lineMany(await this.utils.request(`pt_objects?q=${line}&type[]=line`))
    }

    /**
     * Get a line by id
     * @param {string} lineID The id of the line
     * @returns {Promise<Line>}
     */
    async get(lineID){
        if(lineID.length === 0) {
            throw new Error(Error.code.ID_MISSING)
        }

        return new this.structures.line((await this.utils.request(`lines/${lineID}`)).lines[0])
    }




    _lineMany(lines) {
        const linesMany = [];
        if(lines.pt_objects){
            for(let line of lines.pt_objects) {
                linesMany.push(new this.structures.line(line.line))
            }
        }
        return linesMany
    }
}