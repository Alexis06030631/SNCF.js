import {StructuresManager} from "./StructuresManager";
import {StopArea} from "./StopArea";
import {Line} from "./Line";
export class Route {
	/**
	 * Return the route id
	 */
	id: string;
	/**
	 * Return the route name
	 */
	name: string;
	/**
	 * Return the route direction
	 */
	direction: StopArea;
	/**
	 * Return the route direction type
	 */
	direction_type: string;
	/**
	 * Physical mode of the route
	 */
	physical_modes: any[];
	/**
	 * Return the route line
	 */
	line: Line;

	constructor(Client:any, data:any) {
		this.id = data.id;
		this.name = data.name;
		this.direction = new StopArea(Client, data.direction.stop_area);
		this.direction_type = data.direction_type;
		this.physical_modes = data.physical_modes
		if(data.line) this.line = new Line(Client, data.line);
	}
}