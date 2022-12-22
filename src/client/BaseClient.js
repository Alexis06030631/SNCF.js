const EventEmitter = require('node:events');
const {SncfTypeError, ErrorCodes} = require("../errors");

/**
 * The base class for all clients.
 * @extends {EventEmitter}
 */
module.exports = class BaseClient extends EventEmitter {
	constructor(options = {}) {
		super({ captureRejections: true });

		if (typeof options !== 'object' || options === null) {
			throw new SncfTypeError(ErrorCodes.InvalidType, 'options', 'object', true);
		}
    }
}