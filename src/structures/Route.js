const StructuresManager = require("./StructuresManager");
module.exports = class Route extends StructuresManager{
	constructor(Client, data) {
		super();

		/**
		 * Return the route id
		 * @returns {string}
		 */
		this.id = data.id;

		/**
		 * Return the route name
		 * @returns {string}
		 */
		this.name = data.name;

		/**
		 * Return the route direction
		 * @returns {StopArea}
		 */
		this.direction = new this.class_stop_area(Client, data.direction.stop_area);

		/**
		 * Return the route direction type
		 * @returns {string}
		 */
		this.direction_type = data.direction_type;

		/**
		 * Physical mode of the route
		 * @returns {array}
		 */
		this.physical_modes = data.physical_modes

		/**
		 * Return the route line
		 * @returns {Line}
		 */
		this.line = new this.class_line(Client, data.line);
	}
}