const Sncf = require("./client");

class Stoparea extends Sncf {
    constructor(user, stopareaID){
        super(user)
        this.stopareaID = stopareaID || null
    }

    async search(StationName) {
        const response = await this.requests('GET',`pt_objects/?q=${StationName}`)
        return this.inclMultresp('pt_objects', response)
    }

    async get(stopareaID) {
        const response = await this.requests('GET',`stop_areas/${stopareaID}`)
        return this.inclresp('stop_areas', response)
    }

    async departures(stopareaID, items = 10){
        stopareaID = this.check_stopareaID(stopareaID);
        if(typeof stopareaID !== 'string') return stopareaID;
        const response = await this.requests('GET', `stop_areas/${stopareaID}/departures?count=${items}`)
        return this.this.return_values('departures', response.status, response.data.departures)
    }

    async arrivals(stopareaID, items = 10){
        stopareaID = this.check_stopareaID(stopareaID);
        if(typeof stopareaID !== 'string') return stopareaID;
        const response = await this.requests('GET', `stop_areas/${stopareaID}/arrivals?count=${items}`)
        return this.this.return_values('arrivals', response.status, response.data.arrivals)
    }

    async shedules(stopareaID){
        stopareaID = this.check_stopareaID(stopareaID);
        if(typeof stopareaID !== 'string') return stopareaID;
        const response = await this.requests('GET', `stop_areas/${stopareaID}/route_schedules`)
        return this.this.return_values('route_schedules', response.status, response.data.route_schedules)
    }

    check_stopareaID(stopareaID){
        if(!stopareaID) {
            if(!stopareaID) {
                return {status: 400, message: "Stoparea id is required"};
            }
        }
        return stopareaID
    }
}

Sncf.prototype.stoparea = new Stoparea()
module.exports = Stoparea