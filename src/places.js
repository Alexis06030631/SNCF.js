const utils = require("./utils/utils");
const Place = require("./structures/place");

const type = [
    "stop_area",
    "stop_point",
    "address",
    "administrative_region",
    "poi",
]

class Places {
    #token
    constructor(token) {
        this.#token = token;
    }


    /**
     * Search for a place by name
     * @param {String} station The name of the station to search for
     * @param {String<type>} type The filters to apply to the search
     * @returns {Promise<Place[]>}
     * */
    async search(station, type) {
        return this._placesMany(await utils.request(this.#token, `places/?q=${station}&type[]=${type}`))
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

        return new Place((await utils.request(this.#token, `places/${stationID}`)).places[0], this.#token)
    }




    _placesMany(places) {
        const placesMany = [];
        if(!places?.places?.length) {
            for(let place of places.places) {
                placesMany.push(new Place(place, this.#token))
            }
        }
        return placesMany
    }
}

module.exports = Places;