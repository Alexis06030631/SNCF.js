const axios = require("axios");
const utils = require("../utils");
const Line = require("./line");

module.exports = class Place {
    #token
    constructor(data, token) {
        this.#token = token
        this.embedded_type = data.embedded_type
        this.stop_area = data.stop_area
        this.quality = data.quality
        this.name = data.name
        this.id = data.id
    }

    departures(length = 10) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/departures?count=${length}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve({disruptions: res.data.disruptions,  departures:res.data.departures})
            }).catch(err => {
                reject(utils.error(err.response));
            })
        })
    }

    arrivals(length = 10) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/arrivals?count=${length}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve({disruptions: res.data.disruptions,  arrivals:res.data.departures})
            }).catch(err => {
                reject(utils.error(err.response));
            })
        })
    }

    commercial_modes() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/commercial_modes`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(res.data.commercial_modes)
            }).catch(err => {
                reject(utils.error(err.response));
            })
        })
    }

    lines(count = 10) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/lines?count=${count}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(this._linesMany(res.data))
            }).catch(err => {
                console.log(err)
                reject(utils.error(err.response));
            })
        })
    }

    networks() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/networks`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(res.data.networks)
            }).catch(err => {
                console.log(err)
                reject(utils.error(err.response));
            })
        })
    }

    physical_modes() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/physical_modes`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(res.data.physical_modes)
            }).catch(err => {
                console.log(err)
                reject(utils.error(err.response));
            })
        })
    }

    // TODO: place_nearby



    _linesMany(lines) {
        const linesMany = [];
        for(let line of lines.lines) {
            console.log(line)
            linesMany.push(new Line(line, this.#token))
        }
        return linesMany
    }
}