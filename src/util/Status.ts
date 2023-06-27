import { createEnum } from './Enums';

/**
 * @typedef {Object} Status
 * @property {number} Ready
 * @property {number} Connecting
 * @property {number} Idle
 * @property {number} Disconnected
 */

// JSDoc for IntelliSense purposes
/**
 * @type {Status}
 * @ignore
 */
export default createEnum([
	'Ready',
	'Connecting',
	'Idle',
	'Disconnected',
]);