import {StructuresManager} from "./StructuresManager";
import {navitiaDateToDate} from "../util";
import {Time} from "../models";
import {StopArea} from "./StopArea";
export class StopStep {
	/**
	 * Return the Arrival data of the stop
	 */
	arrival: Time;
	/**
	 * Return the Departure data of the stop
	 */
	departure: Time;
	/**
	 * Return the stop area
	 */
	stop_area: StopArea;
	/**
	 * @internal
	 */
	client: any;

	constructor(Client:any, data:any) {
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "data", {value: data})

		this.arrival = {
			base_date: navitiaDateToDate(data.base_arrival_date_time),
			real_date: navitiaDateToDate(data.arrival_date_time),
		}
		this.departure = {
			base_date: navitiaDateToDate(data.base_departure_date_time),
			real_date: navitiaDateToDate(data.departure_date_time),
		}
		this.stop_area = new StopArea(this.client, data.stop_point)
	}
}