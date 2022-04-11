const Sncf = require("./client");
const response_format = require("./utils/response_format");
const axios = require("axios");

class Places extends Sncf {
    constructor(client) {
        super(client);
        this.client = client;
        console.log(client)
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
