const Sncf = require("./client");

class Stoparea extends Sncf {
    constructor(user, stoparea_id){
        super(user)
        this.stoparea_id = stoparea_id || null
    }

    async departures(stoparea_id, items = 10){
        stoparea_id = this.check_stoparea_id(stoparea_id);
        if(typeof stoparea_id !== 'string') return stoparea_id;
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/departures?count=${items}`)
        return this.this.return_values('departures', response.status, response.data.departures)
    }

    async arrivals(stoparea_id, items = 10){
        stoparea_id = this.check_stoparea_id(stoparea_id);
        if(typeof stoparea_id !== 'string') return stoparea_id;
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/arrivals?count=${items}`)
        return this.this.return_values('arrivals', response.status, response.data.arrivals)
    }

    async shedules(stoparea_id){
        stoparea_id = this.check_stoparea_id(stoparea_id);
        if(typeof stoparea_id !== 'string') return stoparea_id;
        const response = await this.requests('GET', `stop_areas/${stoparea_id}/route_schedules`)
        return this.this.return_values('route_schedules', response.status, response.data.route_schedules)
    }

    check_stoparea_id(stoparea_id){
        if(!stoparea_id) {
            if(!stoparea_id) {
                return {status: 400, message: "Stoparea id is required"};
            }
        }
        return stoparea_id
    }
}

Sncf.prototype.stoparea = new Stoparea()
module.exports = Stoparea