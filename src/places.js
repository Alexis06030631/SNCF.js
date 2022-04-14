const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Places extends Sncf {
    async search(station, filter = true) {
        const response = await this.requests('GET',`places/?q=${station}`)
        if(response.data.places) {
            if(filter) {
                response.data.places = response.data.places.filter((d)=> d.embedded_type === 'stop_area')
            }
            return response_format.places(response.status, response.data.places)
        } else {
            return response_format.places(404, {message: 'No places found'})
        }
    }

    async get(stationID){
        if(!stationID.includes('stop_area:SNCF:')){
            stationID = `stop_area:SNCF:${stationID}`
        }
        const response = await this.requests('GET', `places/${stationID}`)
        if(!response.data.places) return response_format.place(404, {message: 'Place not found'})
        else return response_format.place(response.status, response.data.places[0])
    }
}

module.exports = new Places;