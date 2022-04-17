const Sncf = require('../client');
const moment = require('moment');

class Line extends Sncf {
    constructor(user, line) {
        super(user)
        this.lineID = line.id || null
    }

    async departures(items = 10){
        const response = await this.requests('GET', `lines/${this.lineID}/departures?count=${items}`)
        return this.return_values('departures', response.status, response.data.departures)
    }

    async arrivals(items = 10){
        const response = await this.requests('GET', `lines/${this.lineID}/arrivals?count=${items}`)
        return this.return_values('arrivals', response.status, response.data.arrivals)
    }

    async daysTrain(options = {date:new Date(), items: 20}){
        let date = moment(options.date).format("YYYYMMDD[T]HHmmss")
        const response = await this.requests('GET', `lines/${this.lineID}/vehicle_journeys?count=${options.items}&datetime=${date}`)
        return this.inclMultresp('vehicle_journeys', response)
    }

    async stopAreas(items = 20){
        const response = await this.requests('GET', `lines/${this.lineID}/stop_areas?count=${items}`)
        return this.inclMultresp('stop_areas', response)
    }

}

module.exports = Line