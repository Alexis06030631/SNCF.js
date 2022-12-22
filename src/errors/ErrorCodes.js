'use strict';

/**
 * @typedef {Object} SNCFjsErrorCodes

 * @property {'UnknownError'} UnknownError
 * @property {'TokenInvalid'} TokenInvalid
 * @property {'TokenMissing'} TokenMissing
 * @property {'UrlNotFound'} UrlNotFound
 * @property {'NotImplemented'} NotImplemented
 * @property {'InvalidFunction'} InvalidFunction
 */

const keys = [
	'UnknownError',
	'TokenInvalid',
	'TokenMissing',
	'UrlNotFound',
	'NotImplemented',
	'InvalidFunction'
];

// JSDoc for IntelliSense purposes
/**
 * @type {SNCFjsErrorCodes}
 * @ignore
 */
module.exports = Object.fromEntries(keys.map(key => [key, key]));