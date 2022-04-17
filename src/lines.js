const Sncf = require("./client");

class Lines extends Sncf {
    constructor(user, lineID) {
        super(user)
        this.lineID = lineID || null
    }

    /**
     * Returns array of lines SNCF Found.
     *
     * @param {String} from Starting point
     * @param {String} to Arrival point
     * @param {Boolean} filter If filtre is true, only lines are returned
     * @return {object} Return array with lines data.
     */
    async search(from, to, filter = true) {
        const station = `${from} - ${to}`;
        const response = await this.requests('GET',`pt_objects/?q=${station}`)
        if(response.data.pt_objects && filter) {
            response.data.pt_objects = response.data.pt_objects.filter((d)=> d.embedded_type === 'line')
        }
        return this.return_values('lines', response.status, response.data?.pt_objects)
    }

    /**
     * Returns array of lines SNCF Found.
     *
     * @param {String} lineID The ID of the line
     * @return {object} Return object with line data.
     */
    async get(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/`)
        return this.inclresp('line', response)
    }
}

Sncf.prototype.lines = new Lines()
module.exports = Lines