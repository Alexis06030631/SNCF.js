const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Stoparea extends Sncf {
    async departures(stoparea_id, items = 10){
        if(!stoparea_id.includes('stop_area:SNCF:')){
            stoparea_id = `stop_area:SNCF:${stoparea_id}`
        }
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/departures?count=${items}`)
        return response_format.return_values('arrivals', response.status, response.data.departures)
    }

    async arrivals(stoparea_id, items = 10){
        if(!stoparea_id.includes('stop_area:SNCF:')){
            stoparea_id = `stop_area:SNCF:${stoparea_id}`
        }
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/arrivals?count=${items}`)
        return response_format.return_values('arrivals', response.status, response.data.arrivals)
    }
}

Sncf.prototype.stoparea = new Stoparea()
module.exports.Stoparea = new Stoparea()