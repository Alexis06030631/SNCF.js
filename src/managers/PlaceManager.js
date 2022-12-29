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
            }else resolve(this.#placesMany(request))
        })
    }

    /**
     * Get a place by id
     * @param {string} stationID The id of the station to get
     * @returns {Promise<StopArea>}
     */
    async get(stationID){
        return new Promise(async (resolve, reject) => {
            if(!stationID) reject(new Error(SncfjsErrorCodes.IdIsMissing))

            const request = await this.client.requestManager.request(`places/${stationID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                if(request.places[0].embedded_type === 'administrative_region') {
                    return resolve(new AdministrativeRegion(this.client, request.places[0].administrative_region))
                }else return resolve(new StopArea(this.client, request.places[0].stop_area))
            }
        })
    }

    #placesMany(places) {
        const result = {
            date: navitiaDateToDate(places.context.current_datetime),
            administrative_regions: [],
            stop_areas: [],
        }
        if(places?.places) {
            for(let place of places.places.filter(place => place.embedded_type === 'stop_area')) {
                result.stop_areas.push(new StopArea(this.client,place.stop_area))
            }
            for (let place of places.places.filter(place => place.embedded_type === 'administrative_region')) {
                result.administrative_regions.push(new AdministrativeRegion(this.client, place.administrative_region))
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