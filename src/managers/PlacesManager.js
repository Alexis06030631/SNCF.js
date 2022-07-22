const CachedManager = require("./CachedManager");
const place_types = require("../utils/place_types.json");

class PlacesManager extends CachedManager {
    constructor(client) {
        super()

        this.utils = client.utils
        this.structures = client.structures
    }


    /**
     * Search for a place by name
     * @param {string} station The name of the station to search for
     * @param {string.<place_types>} type The filters to apply to the search
     * @returns {Promise<Place[]>}
     * */
    async search(station, type) {
        if(type && !place_types.includes(type)) {
            throw new Error(Error.code.INVALID_PLACE_TYPE.replace("%s", place_types.join(", ")))
        }
        return this._placesMany(await this.utils.request(`places/?q=${station}&${type? `type[]=${type}`: ""}`))
    }

    /**
     * Get a place by id
     * @param stationID
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
        const placesMany = [];
        if(places?.places) {
            for(let place of places.places) {
                placesMany.push(new this.structures.place(place))
            }
        }
        return placesMany
    }
}

module.exports = PlacesManager;