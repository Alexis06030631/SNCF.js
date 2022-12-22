const CachedManager = require("./CachedManager");
const {navitiaDateToDate} = require("../util/Converter");
const SncfjsErrorCodes = require("../errors/ErrorCodes");
const Place = require("../structures/Place");
const StopArea = require("../structures/StopArea");
const AdministrativeRegion = require("../structures/AdministrativeRegion");

module.exports = class PlacesManager extends CachedManager {
    constructor(client) {
        super()
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Place Class
     * @type {Place}
     * @param {object} data The data of the place
     * @return {Place}
     */
    #place(data) {
        return new Place(this.client, data);
    }

    /**
     * Get The stop areas of the place
     * @param data
     * @return {StopArea}
     */
    #StopArea(data) {
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
                reject(request.error)
            }else resolve(this._placesMany(request))
        })
    }

    /**
     * Get a place by id
     * @param {string} stationID The id of the station to get
     * @returns {Promise<Place>}
     */
    async get(stationID){
        if(stationID.length === 0) {
            throw new Error(Error.code.ID_MISSING)
        }else if(!stationID.includes('stop_area:SNCF:')){
            if(isNaN(Number(stationID))) {
                throw new Error(Error.code.ID_IS_NOT_A_NUMBER)
            }
            stationID = `stop_area:SNCF:${stationID}`
        }

        return new this.structures.place((await this.utils.request(`places/${stationID}`)).places[0])
    }

    _placesMany(places) {
        const result = {
            date: navitiaDateToDate(places.context.current_datetime),
            administrative_regions: [],
            stop_areas: [],
        }
        if(places?.places) {
            for(let place of places.places.filter(place => place.embedded_type === 'stop_area')) {
                result.stop_areas.push(this.#StopArea(place.stop_area))
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