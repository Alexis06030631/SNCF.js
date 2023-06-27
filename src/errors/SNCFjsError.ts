// Heavily inspired by node's `internal/errors` module
import {ErrorCodes} from './';
import {Messages} from './';


/**
 * Extend an error of some sort into a SNCFjsError.
 * @param {Error} Base Base error to extend
 * @returns {SncfjsError}
 * @ignore
 */
function makeSncfjsError(Base:any) {
	return class SncfjsError extends Base {
		constructor(code:string, ...args:any[]) {
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
function message(code:string, ...args:any[]) {
	if (!(code in ErrorCodes)) throw new Error('Error code must be a valid ErrorCodes');
	const msg = Messages[code];
	if (!msg) throw new Error(`No message associated with error code: ${code}.`);
	if (typeof msg === 'function') { // @ts-ignore
		return msg(...args);
	}
	if (!args?.length) return msg;
	args.unshift(msg);
	return String(...args);
}

export const SncfjsError = makeSncfjsError(Error)
export const SncfjsTypeError = makeSncfjsError(TypeError)
export const SncfjsRangeError = makeSncfjsError(RangeError)