'use strict';

const SncfjsErrorCodes = require('./ErrorCodes');

const Messages = {
	[SncfjsErrorCodes.NotImplemented]: 'This feature is not implemented yet',
	[SncfjsErrorCodes.InvalidFunction]: (func, type) => `The function ${func} is not valid for object with type ${type}`,
	[SncfjsErrorCodes.UnknownError]: code => `An unknown error occurred with code ${code}`,
	[SncfjsErrorCodes.TokenInvalid]: 'An invalid token was provided.',
	[SncfjsErrorCodes.TokenMissing]: 'Request to use token, but token was unavailable to the client.',
	[SncfjsErrorCodes.UrlNotFound]: 'The requested resource was not found.',
};

module.exports = Messages;