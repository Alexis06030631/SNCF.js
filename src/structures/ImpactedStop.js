const StructuresManager = require("./StructuresManager");
const {hourNativiaToHour} = require("../util/Converter");
module.exports = class ImpactedStop extends StructuresManager{
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "data", {value: data})

		/**
		 * Return the cause of the impact
		 * @returns {string}
		 */
		this.cause = data.cause

		/**
		 * Return boolean if the stop is impacted by a detour
		 * @returns {boolean}
		 */
		this.is_detour = data.is_detour

		/**
		 * Return the Arrival data of the stop
		 * @returns {TimeImpact}
		 */
		this.arrival = {
			base_time: hourNativiaToHour(data.base_arrival_time, true),
			real_time: hourNativiaToHour(data.amended_arrival_time, true),
			status: data.arrival_status
		}

		/**
		 * Return the Departure data of the stop
		 * @returns {TimeImpact}
		 */
		this.departure = {
			base_time: hourNativiaToHour(data.base_departure_time, true),
			real_time: hourNativiaToHour(data.amended_departure_time, true),
			status: data.departure_status
		}

		/**
		 * Return the stop area
		 * @returns {StopArea}
		 */
		this.stop_area = new this.class_stop_area(this.client, data.stop_point)
	}
}

/**
 * @typedef {Object} TimeImpact
 * @property {Date} base_time
 * @property {Date} real_time
 * @property {string} status
 */