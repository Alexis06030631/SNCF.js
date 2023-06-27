import {StructuresManager} from "./StructuresManager";
import {hourNativiaToHour} from "../util";
import {TimeImpact} from "../models";
import {StopArea} from "./";
export class ImpactedStop {
	/**
	 * Return the cause of the impact
	 */
	cause: string;
	/**
	 * Return boolean if the stop is impacted by a detour
	 */
	is_detour: boolean;
	/**
	 * Return the Arrival data of the stop
	 */
	arrival: TimeImpact;
	/**
	 * Return the Departure data of the stop
	 */
	departure: TimeImpact;
	/**
	 * Return the stop area
	 */
	stop_area: StopArea;
	/**
	 * @internal
	 */
	client: any;
	/**
	 * @internal
	 */
	data: any;

	constructor(Client:any, data:any) {
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "data", {value: data})

		this.cause = data.cause
		this.is_detour = data.is_detour
		this.arrival = {
			base_time: hourNativiaToHour(data.base_arrival_time, true),
			real_time: hourNativiaToHour(data.amended_arrival_time, true),
			status: data.arrival_status
		}
		this.departure = {
			base_time: hourNativiaToHour(data.base_departure_time, true),
			real_time: hourNativiaToHour(data.amended_departure_time, true),
			status: data.departure_status
		}
		this.stop_area = new StopArea(this.client, data.stop_point)
	}
}