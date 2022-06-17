const response_format = require("./data/response_format");
const axios = require("axios");
const utils = require("./utils");

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
                resolve(res.data)
            }).catch(err => {
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
                resolve(res.data)
            }).catch(err => {
                reject(utils.error(err.response));
            })
        })
    }
}

module.exports = Places;