const axios = require("axios");
const utils = require("../utils");
const Line = require("./line");
const StopSchedules = require("./stop_schedules");
const Vehicle = require("./vehicle");

module.exports = class Place {
    #token
    constructor(data, token) {
        this.#token = token
        this.embedded_type = data.embedded_type
        this.stop_area = data.stop_area
        this.stop_point = data.stop_point
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
                reject(utils.error(err));
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
                reject(utils.error(err));
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
                reject(utils.error(err));
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
                reject(utils.error(err))
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
                reject(utils.error(err))
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
                reject(utils.error(err))
            })
        })
    }

    places_nearby() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/places_nearby`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(this._places_nearbyMany(res.data))
            }).catch(err => {
                reject(utils.error(err))
            })
        })
    }

    stop_schedules() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/stop_schedules`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(this._stop_schedulesMany(res.data))
            }).catch(err => {
                reject(utils.error(err))
            })
        })
    }

    traffic_reports(count = 10) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: utils.SNCFapi + `stop_areas/${this.id}/traffic_reports?count=${count}`,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                resolve(this._traffic_reportsMany(res.data))
            }).catch(err => {
                reject(utils.error(err))
            })
        })
    }




    // TODO: route_schedules
    // TODO: routes
    // TODO: terminus_schedules


    _traffic_reportsMany(traffic) {
        const trafficMany = [];
        for(let traffic_report of traffic.traffic_reports) {
            for(let vehicle of traffic_report.vehicle_journeys) {
                vehicle.network = traffic_report.network
                trafficMany.push(new Vehicle(vehicle, this.#token))
            }
        }
        return trafficMany
    }

    _stop_schedulesMany(stops) {
        const stop_schedulesMany = [];
        for(let stop of stops.stop_schedules) {
            stop_schedulesMany.push(new StopSchedules(stop, this.#token))
        }
        return stop_schedulesMany
    }

    _places_nearbyMany(places) {
        const linesMany = [];
        for(let place of places.places_nearby) {
            linesMany.push(new Place(place, this.#token))
        }
        return linesMany
    }

    _linesMany(lines) {
        const linesMany = [];
        for(let line of lines.lines) {
            linesMany.push(new Line(line, this.#token))
        }
        return linesMany
    }
}