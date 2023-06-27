import {StructuresManager} from "./StructuresManager";
import {ActivePeriods, WeekPattern} from "../models";
export class Calendar {
	/**
	 * Return the active_periods of the calendar
	 */
	active_periods: ActivePeriods;
	/**
	 * Return the week pattern of the calendar
	*/
	week_pattern: WeekPattern;
	constructor(Client:any, data:any) {

		this.active_periods = data.active_periods
			// @ts-ignore
			.map(active_period => {
			return {
				start_date: new Date(active_period.start_date.slice(0, 4), active_period.start_date.slice(4, 6) - 1, active_period.start_date.slice(6, 8)),
				end_date: new Date(active_period.end_date.slice(0, 4), active_period.end_date.slice(4, 6) - 1, active_period.end_date.slice(6, 8))
			}
		});
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