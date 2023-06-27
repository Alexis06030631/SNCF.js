import {StructuresManager} from "./StructuresManager";
import {hourNativiaToHour} from "../util";
import {Route} from "./Route";
import {Network} from "../models";
export class Line {
	/**
	 * Return the line id
	 */
	id: string;
	/**
	 * Return the line name
	 */
	name: string;
	/**
	 * Return the opening time (HH:MM:SS)
	 */
	opening_time: string;
	/**
	 * Return the closing time (HH:MM:SS)
	 */
	closing_time: string;
	/**
	 * Return the line routes if exist
	 */
	routes: Route[];
	/**
	 * Return the line network
	 */
	network: Network;
	/**
	 * Return the physical modes
	 */
	physical_modes: Network[];
	/**
	 * Return the commercial mode
	 */
	commercial_mode: string;
	/**
	 * @internal
	 */
	client: any;

	constructor(Client:any, data:any) {
		Object.defineProperty(this, "client", {value: Client})

		this.id = data.id
		this.name = data.name
		this.opening_time = hourNativiaToHour(data.opening_time)
		this.closing_time = hourNativiaToHour(data.closing_time)
		if(data.routes)this.routes = data.routes
			// @ts-ignore
			.map(route => new Route(this.client, route))
		if(data.network) this.network = {id: data.network.id, name: data.network.name}
		this.physical_modes = data.physical_modes
			// @ts-ignore
			.map(mode => {return {id: mode.id, name: mode.name}})
		this.commercial_mode = data.commercial_mode.name
	}

}
