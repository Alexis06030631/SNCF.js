const CachedManager = require("./CachedManager");
const Line = require("../structures/Line");
const Disruption = require("../structures/Disruption");
module.exports = class LineManager extends CachedManager {
    constructor(client) {
        super()
        Object.defineProperty(this, "client", {value: client})
    }


    /**
     * Search a line by name (departure - arrival)
     * @param {String} line The name of the line
     * @returns {Promise<Line[]>}
     * */
    async search(line) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`pt_objects`, {q: line, "type[]":'line'})
            if(request.error) {
                return reject(request.error)
            }else resolve(request.pt_objects.map(line => new Line(this.client, line.line)))
        })
    }

    /**
     * Get a line by id
     * @param {string} lineID The id of the line
     * @returns {Promise<Line>}
     */
    async get(lineID){
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`lines/${lineID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                return resolve(new Line(this.client, request.lines[0]))
            }
        })
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