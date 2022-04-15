const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Stoparea extends Sncf {
    async departures(stoparea_id, items = 10){
        if(!stoparea_id.includes('stop_area:SNCF:')){
            stoparea_id = `stop_area:SNCF:${stoparea_id}`
        }
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/departures?count=${items}`)
        if(!response.data.departures) return response_format.stop_areas_departure(404, {message: 'No departures found'})
        else return response_format.stop_areas_departures(response.status, response.data.departures)
    }

    async arrivals(stoparea_id, items = 10){
        if(!stoparea_id.includes('stop_area:SNCF:')){
            stoparea_id = `stop_area:SNCF:${stoparea_id}`
        }
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/arrivals?count=${items}`)
        if(!response.data.arrivals) return response_format.stop_areas_arrival(404, {message: 'No arrivals found'})
        else return response_format.stop_areas_arrivals(response.status, response.data.arrivals)
    }
}

Sncf.prototype.stoparea = new Stoparea()
module.exports.Stoparea = new Stoparea()