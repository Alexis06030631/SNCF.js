import {StructuresManager} from "./StructuresManager";
import {navitiaDateToDate} from "../util";
import {StopArea} from "./StopArea";
import {StopStep} from "./StopStep";
import {Co2Emission} from "../models";
export class Step {
	/**
	 * Return the step id
	 */
	id: string;
	/**
	 * Return the step type
	 */
	type: string;
	/**
	 * Return boolean if the step is a transfer
	 */
	is_transfer: boolean;
	/**
	 * Return the step duration
	 */
	duration: number;
	/**
	 * Return the step arrival date time
	 */
	arrival_date_time: Date;
	/**
	 * Return the step departure date time
	 */
	departure_date_time: Date;
	/**
	 * Return the step from if exist
	 */
	from: StopArea;
	/**
	 * Return the step stops if exist
	 */
	stops: StopStep[];
	/**
	 * Return the step to if exist
	 */
	to: StopArea;
	co2_emission: Co2Emission;
	/**
	 * @internal
	 */
	client: any;
	constructor(Client:any, data:any) {
		Object.defineProperty(this, "client", {value: Client})

		this.id = data.id
		this.type = data.transfer_type? data.transfer_type : data.type
		this.is_transfer = !!data.transfer_type
		this.duration = data.duration
		this.arrival_date_time = navitiaDateToDate(data.arrival_date_time)
		this.departure_date_time = navitiaDateToDate(data.departure_date_time)
		if(data?.from) this.from = new StopArea(this.client, data.from.stop_point)
		if(data?.stop_date_times) this.stops = data.stop_date_times
			// @ts-ignore
			.filter(e=>(e.stop_point.id !== this.from.id) && (e.stop_point.id !== data.to.stop_point.id)).map(stop => new this.class_stop_step(this.client, stop))
		if(data?.to) this.to = new StopArea(this.client, data.to.stop_area || data.to.stop_point)
		this.co2_emission = {
			value: data.co2_emission? data.co2_emission.value : null,
			unit: data.co2_emission? data.co2_emission.unit : null
		}
	}

}