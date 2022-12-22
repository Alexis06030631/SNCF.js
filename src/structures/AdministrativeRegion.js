module.exports = class AdministrativeRegion{
	constructor(Client, data) {
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
		 * Return the coordinate of the stop area
		 * @returns {Coord}
		 */
		this.coord = data.coord

		/**
		 * Return the stop area zip code
		 * @returns {string}
		 */
		this.insee = data.insee

		/**
		 * Return the stop area level
		 * @returns {number}
		 */
		this.timezone = data.level
	}
}



