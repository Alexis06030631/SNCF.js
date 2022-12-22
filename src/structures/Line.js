const StructuresManager = require("./StructuresManager");
const {hourNativiaToHour} = require("../util/Converter");
module.exports = class Line extends StructuresManager{
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})
		/**
		 * Return the line id
		 * @returns {string}
		 */
		this.id = data.id

		/**
		 * Return the line name
		 * @returns {string}
		 */
		this.name = data.name

		/**
		 * Return the opening time
		 * @returns {string}
		 */
		this.opening_time = hourNativiaToHour(data.opening_time)

		/**
		 * Return the closing time
		 * @returns {string}
		 */
		this.closing_time = hourNativiaToHour(data.closing_time)

		/**
		 * Return the line routes if exist
		 * @returns {Array<Route>}
		 */
		if(data.routes)this.routes = data.routes.map(route => new this.class_route(this.client, route))

		/**
		 * Return the line network
		 * @returns {Network}
		 */
		if(data.network)this.network = {id: data.network.id, name: data.network.name}

		/**
		 * Return the physical mode
		 * @returns {Network[]}
		 */
		this.physical_modes = data.physical_modes.map(mode => {return {id: mode.id, name: mode.name}})

		/**
		 * Return the commercial mode
		 * @returns {string}
		 */
		this.commercial_mode = data.commercial_mode.name
	}

}

/**
 * @typedef {Object} Network
 * @property {string} id
 * @property {string} name
 */