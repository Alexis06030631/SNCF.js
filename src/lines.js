const Sncf = require("./client");

class Lines extends Sncf {
    constructor(user, lineID) {
        super(user)
        this.lineID = lineID || null
    }

    async search(from, to, filter = true) {
        const station = `${from} - ${to}`;
        const response = await this.requests('GET',`pt_objects/?q=${station}`)
        if(response.data.pt_objects && filter) {
            response.data.pt_objects = response.data.pt_objects.filter((d)=> d.embedded_type === 'line')
        }
        return this.return_values('lines', response.status, response.data?.pt_objects)
    }

    async get(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/`)
        return this.inclresp('line', response)
    }

    async stop_areas(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/stop_areas`)
        return this.return_values('stop_areas', response.status, response.data.stop_areas)
    }
}

Sncf.prototype.lines = new Lines()
module.exports = Lines