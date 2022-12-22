const CachedManager = require("./CachedManager");
const {navitiaDateToDate} = require("../util/Converter");
const SncfjsErrorCodes = require("../errors/ErrorCodes");
const StopArea = require("../structures/StopArea");
const AdministrativeRegion = require("../structures/AdministrativeRegion");

module.exports = class PlacesManager extends CachedManager {
    constructor(client) {
        super()
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Get The stop areas of the place
     * @param data
     * @return {StopArea}
     */
    #stop_area(data) {
        return new StopArea(this.client, data)
    }

    /**
     * Get the administrative regions of the place
     * @param data
     * @return {AdministrativeRegion}
     */
    #AdministrativeRegion(data) {
        return new AdministrativeRegion(this.client, data)
    }


    /**
     * Search for a place by name
     * @param {string} station The name of the station to search for
     * @param {string.<place_types>} [type] The filters to apply to the search
     * @returns {Promise<PlaceManagerResult>}
     * */
    search(station) {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`places`, {q: station})
            if(request.error) {
                return reject(request.error)
            }else resolve(this._placesMany(request))
        })
    }

    /**
     * Get a place by id
     * @param {string} stationID The id of the station to get
     * @returns {Promise<Place>}
     */
    async get(stationID){
        return new Promise(async (resolve, reject) => {
            if(!stationID) reject(new Error(SncfjsErrorCodes.IdIsMissing))

            const request = await this.client.requestManager.request(`places/${stationID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                const result = {
                    date: navitiaDateToDate(request.context.current_datetime),
                }
                if(request.places[0].embedded_type === 'stop_area') {
                    result.stop_area = this.#stop_area(request.places[0].stop_area)
                }
                return resolve(result)
            }
        })
    }

    _placesMany(places) {
        const result = {
            date: navitiaDateToDate(places.context.current_datetime),
            administrative_regions: [],
            stop_areas: [],
        }
        if(places?.places) {
            for(let place of places.places.filter(place => place.embedded_type === 'stop_area')) {
                result.stop_areas.push(this.#stop_area(place.stop_area))
            }
            for (let place of places.places.filter(place => place.embedded_type === 'administrative_region')) {
                result.administrative_regions.push(this.#AdministrativeRegion(place.administrative_region))
            }
        }
        return result
    }
}


/**
 * @typedef {Object} PlaceManagerResult

 * @property {date} date - The date of the search
 * @property {array<AdministrativeRegion>} administrative_regions
 * @property {array<StopArea>} stop_areas
 */

// JSDoc for IntelliSense purposes
/**
 * @type {PlaceManagerResult}
 * @ignore
 */