const utils = require("./utils/utils");
const Line = require("./structures/line");

class Lines {
    #token
    constructor(token) {
        this.#token = token;
    }


    /**
     * Search a line by name (departure - arrival)
     * @param {String} line The name of the line
     * @returns {Promise<Line[]>}
     * */
    async search(line) {
        return this._lineMany(await utils.request(this.#token, `pt_objects?q=${line}&type[]=line`))
    }

    /**
     * Get a line by id
     * @param lineID
     * @returns {Promise<Line>}
     */
    async get(lineID){
        if(lineID.length === 0) {
            throw new Error(Error.code.ID_MISSING)
        }

        return new Line((await utils.request(this.#token, `lines/${lineID}`)).lines[0], this.#token)
    }




    _lineMany(lines) {
        const linesMany = [];
        if(lines.pt_objects){
            for(let line of lines.pt_objects) {
                linesMany.push(new Line(line.line, this.#token))
            }
        }
        return linesMany
    }
}

module.exports = Lines;