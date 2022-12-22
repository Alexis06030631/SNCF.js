const StructuresManager = require("./StructuresManager");
const {navitiaDateToDate, hourNativiaToHour} = require("../util/Converter");
module.exports = class StopTime extends StructuresManager {
	constructor(Client, data) {
		super()
		Object.defineProperty(this, "client", {value: Client})


		/**
		 * Return the headsign of the train
		 * @returns {string}
		 */
		this.headsign = data.headsign

		/**
		 * Arrival time
		 * @returns {string}
		 */
		this.arrival_time = hourNativiaToHour(data.arrival_time)

		/**
		 * Departure time
		 * @returns {string}
		 */
		this.departure_time = hourNativiaToHour(data.departure_time)

		/**
		 * Return boolean if the stop is skipped
		 * @returns {boolean}
		 */
		this.skipped = data.skipped_stop

		/**
		 * Return boolean if drop off is available
		 * @returns {boolean}
		 */
		this.drop_off = data.drop_off_allowed

		/**
		 * Return boolean if pick up is available
		 * @returns {boolean}
		 */
		this.pick_up = data.pickup_allowed

		/**
		 * Return the stop point
		 * @returns {StopArea}
		 */
		this.stop_area = new this.class_stop_area(this.client, data.stop_point)

	}
}