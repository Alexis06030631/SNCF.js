import {StructuresManager} from "./StructuresManager";
import {navitiaDateToDate} from "../util";
import {Disruption} from "./Disruption";
import {Price} from "../models";
import {Step} from "./Step";

export class Journey {
	/**
	 * Return the journey id
	 */
	id: string;
	/**
	 * Define the journey average
	 */
	type: string;
	/**
	 * Return value if status is define
	 */
	status: string;
	/**
	 * If the journey has disruptions return the disruptions
	 */
	disruptions: Disruption[];
	/**
	 * Departure time
	 */
	departure_date_time: Date;
	/**
	 * Arrival time
	 */
	arrival_date_time: Date;
	/**
	 * Duration of the journey
	 */
	duration: number;
	/**
	 * Price of the journey
	 */
	price: Price;
	/**
	 * Transfers of the journey
	 */
	transfers: number;
	/**
	 * @internal
	 */
	sections: any;
	/**
	 * @internal
	 */
	client: any;
	/**
	 * @internal
	 */
	steps_data: any;
	constructor(Client:any, data:any) {
		Object.defineProperty(this, "client", {value: Client})
		Object.defineProperty(this, "steps_data", {value: data.sections})

		if(data.status) this.status = data.status
		if(data.disruptions) this.disruptions = data.disruptions
		this.type = data.type
		this.departure_date_time = navitiaDateToDate(data.departure_date_time)
		this.arrival_date_time = navitiaDateToDate(data.arrival_date_time)
		this.duration = data.duration
		this.price = {
			value: Number(data.fare.total.value),
			found: data.fare.found,
		}
		this.transfers = data.nb_transfers
	}

	/**
	 * Get the steps of the journey
	 */
	get steps(): Step[] {
		let steps = this.steps_data
			// @ts-ignore
			.filter(step => step.duration)
		return steps
			// @ts-ignore
			.map(step => new Step(this.client, step))
	}

}