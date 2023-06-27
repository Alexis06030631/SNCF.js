import {StructuresManager} from "./StructuresManager";
import {Coord} from "../models/";

export class AdministrativeRegion {
	/**
	 * Return the stop area id
	 */
	id: string;
	/**
	 * Return the stop area name
	 */
	name: string;
	/**
	 * Return the coordinate of the stop area
	 */
	coord: Coord;
	/**
	 * Return the stop area zip code
	 */
	insee: string;
	/**
	 * Return the stop area level
	 */
	timezone: number;

	constructor(Client:any, data:any) {
		this.id = data.id
		this.name = data.name
		this.coord = data.coord
		this.insee = data.insee
		this.timezone = data.level
	}
}



