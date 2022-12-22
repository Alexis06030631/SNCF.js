const StructuresManager = require("./StructuresManager");
const {navitiaDateToDate} = require("../util/Converter");
module.exports = class Step extends StructuresManager{
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})
		/**
		 * Return the step id
		 * @returns {string}
		 */
		this.id = data.id

		/**
		 * Return the step type
		 * @returns {string}
		 */
		this.type = data.transfer_type? data.transfer_type : data.type

		/**
		 * Return boolean if the step is a transfer
		 * @returns {boolean}
		 */
		this.is_transfer = data.transfer_type? true : false

		/**
		 * Return the step duration
		 * @returns {number}
		 */
		this.duration = data.duration

		/**
		 * Return the step arrival date time
		 * @returns {Date}
		 */
		this.arrival_date_time = navitiaDateToDate(data.arrival_date_time)

		/**
		 * Return the step departure date time
		 * @returns {Date}
		 */
		this.departure_date_time = navitiaDateToDate(data.departure_date_time)

		/**
		 * From if exist
		 * @returns {StopArea|StopPoint}
		 */
		if(data?.from) this.from = new this.class_stop_area(this.client, data.from.stop_point)

		/**
		 * To
		 * @returns {StopArea|StopPoint}
		 */
		if(data?.to) this.to = new this.class_stop_area(this.client, data.to.stop_area || data.to.stop_point)

		/**
		 * Return the Co2 emission of the step
		 * @returns {Co2Emission}
		 */
		this.co2_emission = {
			value: data.co2_emission? data.co2_emission.value : null,
			unit: data.co2_emission? data.co2_emission.unit : null
		}
	}

}

/**
 * @typedef {Object} Co2Emission
 * @property {number} value
 * @property {string} unit
 */

// JSDoc for IntelliSense purposes
/**
 * @type {Co2Emission}
 * @ignore
 */