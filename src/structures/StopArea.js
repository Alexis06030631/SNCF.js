const Client = require("../managers/ClientManager");

module.exports = class StopArea extends Client{
    constructor(data) {
        super()

        /**
         * Return the stop area id
         * @returns {string}
         */
        this.id = data.id

        /**
         * Return the stop area name
         * @returns {string}
         */
        this.name = data.name

        /**
         * Return the stop area zip code
         * @returns {number}
         */
        this.zip_code = data.administrative_regions[0].zip_code

        /**
         * Return the stop area timezone
         * @returns {string}
         */
        this.timezone = data.timezone

        /**
         * Return the coordinates of the stop area
         * @returns {object}
         */
        this.coord = data.coord
    }
}
