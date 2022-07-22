module.exports = class StructuresManager {
    constructor() {
        this.departure = require("./departure");
        this.line = require("./line");
        this.vehicle = require("./vehicle");
    }
};