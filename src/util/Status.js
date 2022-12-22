'use strict';

const { createEnum } = require('./Enums');

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
module.exports = createEnum([
	'Ready',
	'Connecting',
	'Idle',
	'Disconnected',
]);