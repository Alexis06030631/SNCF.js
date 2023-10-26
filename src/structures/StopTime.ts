import {StructuresManager} from "./StructuresManager";
import {dateWithDateAndHour, hourNativiaToHour} from "../util";
import {StopArea} from "./StopArea";
export class StopTime {
	/**
	 * Return the headsign of the train
	 */
	headsign: string;
	/**
	 * Arrival time
	 * @deprecated Use arrival_date instead
	 */
	arrival_time: string;
	/**
	 * Departure time
	 * @deprecated Use departure_date instead
	 */
	departure_time: string;
	/**
	 * Return the arrival date of the train
	 */
	arrival_date: Date;
	/**
	 * Return the departure date of the train
	 */
	departure_date: Date;
	/**
	 * Return boolean if the stop is skipped
	 */
	skipped: boolean;
	/**
	 * Return boolean if drop off is available
	 */
	drop_off: boolean;
	/**
	 * Return boolean if pick up is available
	 */
	pick_up: boolean;
	/**
	 * Return the stop area
	 */
	stop_area: StopArea;
	/**
	 * @internal
	 */
	client: any;

	constructor(Client:any, data:any, date:Date = new Date()) {
		Object.defineProperty(this, "client", {value: Client})

		this.headsign = data.headsign
		this.arrival_time = hourNativiaToHour(data.arrival_time)
		this.departure_time = hourNativiaToHour(data.departure_time)
		this.arrival_date = dateWithDateAndHour(hourNativiaToHour(data.arrival_time), date)
		this.departure_date = dateWithDateAndHour(hourNativiaToHour(data.departure_time), date)
		this.skipped = data.skipped_stop
		this.drop_off = data.drop_off_allowed
		this.pick_up = data.pickup_allowed
		this.stop_area = new StopArea(this.client, data.stop_point)

	}
}