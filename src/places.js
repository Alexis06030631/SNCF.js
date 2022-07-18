const axios = require("axios");
const utils = require("./utils");
const Place = require("./data/place");

class Places {
    #token
    constructor(token) {
        this.#token = token;
    }


    search(station, filter = true) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `places/?q=${station}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(this._placesMany(res.data))
            }).catch(err => {
                console.log(err)
                reject(utils.error(err.response));
            })
        })
    }

    async get(stationID){
        return new Promise((resolve, reject) => {
            if(!stationID.includes('stop_area:SNCF:')){
                stationID = `stop_area:SNCF:${stationID}`
            }
            axios({
                method: 'GET',
                url: utils.SNCFapi + `places/${stationID}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(new Place(res.data.places[0], this.#token))
            }).catch(err => {
                reject(utils.error(err.response));
            })
        })
    }




    _placesMany(places) {
        const placesMany = [];
        for(let place of places.places) {
            placesMany.push(new Place(place, this.#token))
        }
        return placesMany
    }
}

module.exports = Places;