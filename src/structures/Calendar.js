const StructuresManager = require("./StructuresManager");
module.exports = class Calendar extends StructuresManager{
	constructor(Client, data) {
		super();

		/**
		 * Return the active_periods of the calendar
		 * @returns {array<ActivePeriods>}
		 */
		this.active_periods = data.active_periods.map(active_period => {
			return {
				start_date: new Date(active_period.start_date.slice(0, 4), active_period.start_date.slice(4, 6) - 1, active_period.start_date.slice(6, 8)),
				end_date: new Date(active_period.end_date.slice(0, 4), active_period.end_date.slice(4, 6) - 1, active_period.end_date.slice(6, 8))
			}
		});

		/**
		 * Return the week pattern of the calendar
		 * @returns {WeekPattern}
		 */
		this.week_pattern = {
			monday: data.week_pattern.monday,
			tuesday: data.week_pattern.tuesday,
			wednesday: data.week_pattern.wednesday,
			thursday: data.week_pattern.thursday,
			friday: data.week_pattern.friday,
			saturday: data.week_pattern.saturday,
			sunday: data.week_pattern.sunday
		}
	}
}

/**
 * @typedef {Object} ActivePeriods
 * @property {Date} start_date
 * @property {Date} end_date
 */

/**
 * @typedef {Object} WeekPattern
 * @property {boolean} monday
 * @property {boolean} tuesday
 * @property {boolean} wednesday
 * @property {boolean} thursday
 * @property {boolean} friday
 * @property {boolean} saturday
 * @property {boolean} sunday
 */