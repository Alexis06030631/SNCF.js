const StructuresManager = require("./StructuresManager");
const {hourNativiaToHour, navitiaDateToDate} = require("../util/Converter");
module.exports = class StopStep extends StructuresManager{
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "data", {value: data})

		/**
		 * Return the Arrival data of the stop
		 * @returns {Time}
		 */
		this.arrival = {
			base_date: navitiaDateToDate(data.base_arrival_date_time),
			real_date: navitiaDateToDate(data.arrival_date_time),
		}

		/**
		 * Return the Departure data of the stop
		 * @returns {Time}
		 */
		this.departure = {
			base_date: navitiaDateToDate(data.base_departure_date_time),
			real_date: navitiaDateToDate(data.departure_date_time),
		}

		/**
		 * Return the stop area
		 * @returns {StopArea}
		 */
		this.stop_area = new this.class_stop_area(this.client, data.stop_point)
	}
}

/**
 * @typedef {Object} Time
 * @property {Date} base_date
 * @property {Date} real_date
 */