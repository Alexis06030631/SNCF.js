const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Routes extends Sncf {
    async search(from, to, filter = true) {
        const station = `${from} - ${to}`;
        const response = await this.requests('GET',`pt_objects/?q=${station}`)
        if(response.data.pt_objects && filter) {
            response.data.pt_objects = response.data.pt_objects.filter((d)=> d.embedded_type === 'line')
        }
        return response_format.return_values('routes', response.status, response.data?.pt_objects)
    }

    async get(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/route_schedules`)
        return response_format.return_values('route', response.status, response.data.route_schedules)
    }

    async stop_areas(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/stop_areas`)
        return response_format.return_values('stop_areas', response.status, response.data.stop_areas)
    }
}

Sncf.prototype.routes = new Routes()
module.exports.Routes = new Routes()