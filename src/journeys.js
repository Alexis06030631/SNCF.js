const Sncf = require("./client");
const moment = require("moment");

class Journeys extends Sncf {
    constructor(user, stopareaID){
        super(user)
        this.stopareaID = stopareaID || null
    }

    async get(from, to, options = {date: new Date()}) {
        let date = moment(options.date).format("YYYYMMDD[T]HHmmss")
        if(!from.includes('stop_area:SNCF:')){
            from = await this.searchPlace(from)
        }
        if(!to.includes('stop_area:SNCF:')){
            to = await this.searchPlace(to)
        }
        const response = await this.requests('GET',`journeys/?from=${from}&to=${to}&date=${date}`)
        return this.inclMultresp('journeys', response)
    }

    async searchPlace(placeName) {
        const response = await this.requests('GET',`places/?q=${placeName}&display_geojson=false`)
        return response.data.places.filter(place => place.embedded_type === 'stop_area')[0].id
    }
}

Sncf.prototype.journeys = new Journeys()
module.exports = Journeys