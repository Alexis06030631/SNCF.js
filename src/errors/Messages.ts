'use strict';

import {ErrorCodes} from './';

export const Messages =  {
	[ErrorCodes.NotImplemented]: 'This feature is not implemented yet',
	[ErrorCodes.InvalidFunction]: (func:string, type:string) => `The function ${func} is not valid for object with type ${type}`,
	[ErrorCodes.UnknownError]: (code:string) => `An unknown error occurred with code ${code}`,
	[ErrorCodes.TokenInvalid]: 'An invalid token was provided.',
	[ErrorCodes.TokenMissing]: 'Request to use token, but token was unavailable to the client.',
	[ErrorCodes.UrlNotFound]: 'The requested resource was not found.',
	[ErrorCodes.TokenNotInitialized]: 'The token was not initialized. Please use the login function to initialize the token.',
	[ErrorCodes.NotReady]: 'The client is not ready. Please make sure you are logged in (client.login()) and that the token is valid.',
	[ErrorCodes.IdIsMissing]: 'The id is missing. Please provide a valid id.',
	[ErrorCodes.MissingParameter]: (param:string, mult:boolean) => `The parameter${mult? 's':''} ${param} ${mult? 'are':'is'} missing. Please provide a valid${mult? '':'ly'} ${param}.`,
	[ErrorCodes.InvalidDate]: (date:string) => `The string ${date} is not valid date. Please provide a valid date.`,
	[ErrorCodes.NetworkError]: (details:any) => `The request at ${details.host} was failed with the code ${details.code}. Please verify it and try again.`,
	[ErrorCodes.InvalidId]: (id:string) => `The id "${id}" is not valid. Please provide a valid id.`,
	[ErrorCodes.NoResultFound]: (param:string) => `No result found for ${param}.`,
	[ErrorCodes.HeadSignNotFound]: (param:string) => `The headsign "${param}" was not found. Please provide a valid headsign or check the date.`,

	// Navitia errors codes
	[ErrorCodes.unable_to_parse]: 'Unable to parse the data from the API. Please try again later or change the parameters.',
	[ErrorCodes.UnknownObject]: 'The object you are trying to access does not exist.',
	[ErrorCodes.date_out_of_bounds]: 'The date you are trying to access is out of bounds.',
};