const axios = require("axios");
const utils = require("./utils");
const Place = require("./data/place");

class Places {
    #token
    constructor(token) {
        this.#token = token;
    }


    search(station) {
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
                reject(utils.error(err))
            })
        })
    }

    async get(stationID){
        return new Promise((resolve, reject) => {
            if(stationID.length === 0) {
                reject(new Error(Error.code.ID_MISSING))
            }else if(!stationID.includes('stop_area:SNCF:')){
                if(isNaN(Number(stationID))) {
                    reject(new Error(Error.code.ID_IS_NOT_A_NUMBER))
                }
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
                reject(utils.error(err));
            })
        })
    }




    _placesMany(places) {
        if(!places?.places?.length) {
            return new Error(Error.code.PLACE_NOT_FOUND)
        }
        const placesMany = [];
        for(let place of places.places) {
            placesMany.push(new Place(place, this.#token))
        }
        return placesMany
    }
}

module.exports = Places;