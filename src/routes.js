const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Routes extends Sncf {
    async search(from, to, filter = true) {
        const station = `${from} - ${to}`;
        const response = await this.requests('GET',`pt_objects/?q=${station}`)
        if(response.data.pt_objects) {
            if(filter) {
                response.data.pt_objects = response.data.pt_objects.filter((d)=> d.embedded_type === 'line')
            }
            return response_format.routes(response.status, response.data.pt_objects)
        } else {
            return response_format.routes(404, {message: 'No lines found'})
        }
    }

    async get(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/route_schedules`)
        if(!response.data.route_schedules) return response_format.route(404, {message: 'Line not found'})
        else return response_format.route(response.status, response.data.route_schedules[0])
    }

    async stop_areas(lineID){
        if(!lineID.includes('line:SNCF:')){
            lineID = `line:SNCF:${lineID}`
        }
        const response = await this.requests('GET', `lines/${lineID}/stop_areas`)
        if(!response.data.stop_areas) return response_format.stop_areas(404, {message: 'Line not found'})
        else return response_format.route(response.status, response.data.stop_areas)
    }
}

module.exports = new Routes;