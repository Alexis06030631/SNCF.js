const StructuresManager = require("./StructuresManager");
const {hourNativiaToHour, navitiaDateToDate} = require("../util/Converter");
module.exports = class Departure extends StructuresManager{
	constructor(Client, data) {
		super()


		/**
		 * Return the train data
		 * @returns {Train_info}
		 */
		this.train = {
			headsign: data.display_informations.headsign,
			name: data.display_informations.name,
			direction: data.display_informations.direction,
			commercial_mode: data.display_informations.commercial_mode,
			physical_mode: data.display_informations.physical_mode,
		}


		/**
		 * Returns the arrival time
		 * @returns {string}
		 */
		this.arrival_date_time = navitiaDateToDate(data.stop_date_time.arrival_date_time);

		/**
		 * Returns the default arrival time
		 * @returns {string}
		 */
		this.base_arrival_date_time = navitiaDateToDate(data.stop_date_time.base_arrival_date_time);

		/**
		 * Returns the departure time
		 * @returns {string}
		 */
		this.departure_date_time = navitiaDateToDate(data.stop_date_time.departure_date_time);

		/**
		 * Returns the default departure time
		 * @returns {string}
		 */
		this.base_departure_date_time = navitiaDateToDate(data.stop_date_time.base_departure_date_time);

		/**
		 * Return route data
		 * @returns {Route}
		 */
		this.route = new this.class_route(Client, data.route);

		/**
		 * Return stop point data
		 * @returns {StopArea}
		 */
		this.stop_area = new this.class_stop_area(Client, data.stop_point.stop_area);

		/**
		 * Return boolean if the train is in late
		 * @returns {boolean}
		 */
		this.isLate = this.departure_date_time !== this.base_departure_date_time || this.arrival_date_time !== this.base_arrival_date_time;
	}
}


/**
 * @typedef {Object} Train_info
 * @property {string} headsign - The train identifier
 * @property {string} name - The train name
 * @property {string} direction - The train direction
 * @property {string} commercial_mode - The train commercial mode
 * @property {string} physical_mode - The train physical mode
 */