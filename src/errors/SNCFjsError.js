'use strict';

// Heavily inspired by node's `internal/errors` module
const ErrorCodes = require('./ErrorCodes');
const Messages = require('./Messages');

/**
 * Extend an error of some sort into a SNCFjsError.
 * @param {Error} Base Base error to extend
 * @returns {SncfjsError}
 * @ignore
 */
function makeSncfjsError(Base) {
	return class SncfjsError extends Base {
		constructor(code, ...args) {
			super(message(code, args));
			this.code = code;
			if(args[1]) this.details = args[1];
			Error.captureStackTrace?.(this, SncfjsError);
		}

		get name() {
			return `${super.name} [${this.code}]`;
		}
	};
}

/**
 * Format the message for an error.
 * @param {string} code The error code
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 * @ignore
 */
function message(code, args) {
	if (!(code in ErrorCodes)) throw new Error('Error code must be a valid SNCFjsErrorCodes');
	const msg = Messages[code];
	if (!msg) throw new Error(`No message associated with error code: ${code}.`);
	if (typeof msg === 'function') return msg(...args);
	if (!args?.length) return msg;
	args.unshift(msg);
	return String(...args);
}

module.exports = {
	SncfjsError: makeSncfjsError(Error),
	SncfTypeError: makeSncfjsError(TypeError),
	SncfjsRangeError: makeSncfjsError(RangeError),
};