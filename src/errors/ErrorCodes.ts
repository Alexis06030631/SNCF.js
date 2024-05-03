const keys: string[] = [
	'UnknownError',
	'TokenInvalid',
	'TokenMissing',
	'TokenNotInitialized',
	'NotReady',
	'IdIsMissing',
	'UrlNotFound',
	'NotImplemented',
	'InvalidFunction',
	'MissingParameter',
	'InvalidDate',
	'NetworkError',
	'InvalidId',
	'NoResultFound',
	'HeadSignNotFound',

	// Navitia errors codes
	'unable_to_parse',
	'UnknownObject',
	'date_out_of_bounds'
];



export const ErrorCodes = Object.fromEntries(keys.map(key => [key, key]));