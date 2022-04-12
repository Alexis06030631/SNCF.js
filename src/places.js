const response_format = require("./utils/response_format");
const Sncf = require("./client");

class Places extends Sncf {
    async found(station, filter = true) {
        const response = await this.requests('GET',`places/?q=${station.replaceAll(' ', '%20')}`)
        if(response.data.places) {
            if(filter) {
                response.data.places = response.data.places.filter((d)=> d.embedded_type === 'stop_area')
            }
            return response_format.places(response.status, response.data.places)
        } else {
            return response_format.places(404, {message: 'No places found'})
        }
    }

    async getStation(station, filter = true) {
        let response = {}
        let places = []
        if(station.includes('stop_area:')){
            response = await this.requestSNCFapi('GET', `places/${station}`)
        } else response = await this.requestSNCFapi('GET', `places/?q=${station.replaceAll(' ', '%20')}`)
        if(!response.data.places) response.data.places = []
        if(filter) places = response.data.places.filter((d)=> d.embedded_type === 'stop_area')
        else places = response.data.places
        return response_format.places(response.status, places)
    }
}
