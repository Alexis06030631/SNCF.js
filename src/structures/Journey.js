const StructuresManager = require("./StructuresManager");
const {navitiaDateToDate} = require("../util/Converter");

module.exports = class Journey extends StructuresManager{
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "steps_data", {value: data.sections})


		/**
		 * Define the journey average
		 * @returns {string}
		 */
		this.type = data.type

		/**
		 * Departure time
		 * @returns {Date}
		 */
		this.departure_date_time = navitiaDateToDate(data.departure_date_time)

		/**
		 * Arrival time
		 * @returns {Date}
		 */
		this.arrival_date_time = navitiaDateToDate(data.arrival_date_time)

		/**
		 * Duration of the journey
		 * @returns {number}
		 */
		this.duration = data.duration

		/**
		 * Price of the journey
		 * @returns {Price}
		 */
		this.price = {
			value: Number(data.fare.total.value),
			found: data.fare.found,
		}

		/**
		 * Transfers of the journey
		 * @returns {number}
		 */
		this.transfers = data.nb_transfers
	}

	/**
	 * Get the steps of the journey
	 * @returns {Promise<Step[]>}
	 */
	get steps() {
		let steps = this.steps_data.filter(step => step.duration)
		return steps.map(step => new this.class_step(this.client, step))
	}

}

/**
 * @typedef {Object} Price
 * @property {string} value - The price value
 * @property {boolean} [found] - The price found
 */

// JSDoc for IntelliSense purposes
/**
 * @type {Price}
 * @ignore
 */