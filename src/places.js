const Sncf = require("./client");

class Places extends Sncf {
    async search(station, filter = true) {
        const response = await this.requests('GET',`places/?q=${station}`)
        if(response.data.places && filter) {
            response.data.places = response.data.places.filter((d)=> d.embedded_type === 'stop_area')
        }
        return this.return_values('places', response.status, response.data.places)
    }

    async get(stationID){
        if(!stationID.includes('stop_area:SNCF:')){
            stationID = `stop_area:SNCF:${stationID}`
        }
        const response = await this.requests('GET', `places/${stationID}`)
        return this.return_values('place', response.status, response.data?.places)
    }
}

Sncf.prototype.places = new Places()
module.exports = Places