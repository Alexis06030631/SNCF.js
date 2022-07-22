module.exports = class StructuresManager {
    constructor() {
        this.departure = require("./departure");
        this.line = require("./line");
        this.vehicle = require("./vehicle");
        this.disruption = require("./disruption");
        this.stop_area = require("./StopArea");
    }
};