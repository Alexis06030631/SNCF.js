'use strict';

const SncfjsErrorCodes = require('./ErrorCodes');

const Messages = {
	[SncfjsErrorCodes.NotImplemented]: 'This feature is not implemented yet',
	[SncfjsErrorCodes.InvalidFunction]: (func, type) => `The function ${func} is not valid for object with type ${type}`,
	[SncfjsErrorCodes.UnknownError]: code => `An unknown error occurred with code ${code}`,
	[SncfjsErrorCodes.TokenInvalid]: 'An invalid token was provided.',
	[SncfjsErrorCodes.TokenMissing]: 'Request to use token, but token was unavailable to the client.',
	[SncfjsErrorCodes.UrlNotFound]: 'The requested resource was not found.',
	[SncfjsErrorCodes.TokenNotInitialized]: 'The token was not initialized. Please use the login function to initialize the token.',
	[SncfjsErrorCodes.NotReady]: 'The client is not ready. Please make sure you are logged in (client.login()) and that the token is valid.',
	[SncfjsErrorCodes.IdIsMissing]: 'The id is missing. Please provide a valid id.',
	[SncfjsErrorCodes.MissingParameter]: (param, mult) => `The parameter${mult? 's':''} ${param} ${mult? 'are':'is'} missing. Please provide a valid${mult? '':'ly'} ${param}.`,
	[SncfjsErrorCodes.InvalidDate]: (date) => `The string ${date} is not valid date. Please provide a valid date.`,
	[SncfjsErrorCodes.EnotFound]: (url) => `The url ${url} couldn't be found. Please verify your network connection and try again.`,

	// Navitia errors codes
	[SncfjsErrorCodes.unable_to_parse]: 'Unable to parse the data from the API. Please try again later or change the parameters.',
	[SncfjsErrorCodes.UnknownObject]: 'The object you are trying to access does not exist.',
	[SncfjsErrorCodes.date_out_of_bounds]: 'The date you are trying to access is out of bounds.',
};

module.exports = Messages;