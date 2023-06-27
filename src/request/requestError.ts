import {ErrorCodes, SncfjsError} from "../errors";
export function defineRequestError (response:any) {
	switch (response?.response?.status) {
		case 401:
			return new SncfjsError(ErrorCodes.TokenInvalid, response?.response?.data?.message);
		case 404:
			switch (response?.response?.data?.error?.id) {
				case 'unknown_object':
					return new SncfjsError(ErrorCodes.UnknownObject, response?.response?.data?.error?.message);
				case 'date_out_of_bounds':
					return new SncfjsError(ErrorCodes.date_out_of_bounds, response?.response?.data?.error?.message);
			}
			return new SncfjsError(ErrorCodes.UrlNotFound, response?.response?.data?.message || response?.response?.data?.error?.message);
		default:
			break;
	}

	if(response.message.includes('Invalid value "undefined" for header "Authorization"')){
		return new SncfjsError(ErrorCodes.TokenMissing, response.message);
	}

	if(response.isAxiosError){
		return new SncfjsError(ErrorCodes.NetworkError, {host: response.hostname, code:response.code}, response.message);
	}

	return new SncfjsError(ErrorCodes.UnknownError, response?.response?.data?.code||response.code, response?.response?.data?.message || response?.message);
}