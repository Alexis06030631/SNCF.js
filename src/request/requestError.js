const {SncfjsError, ErrorCodes} = require("../errors");
module.exports = {
	defineRequestError: (response) => {
		switch (response?.response?.status) {
			case 401:
				return new SncfjsError(ErrorCodes.TokenInvalid, response?.response?.data?.message);
			case 404:
				return new SncfjsError(ErrorCodes.UrlNotFound, response?.response?.data?.message);
		}

		if(response.message.includes('Invalid value "undefined" for header "Authorization"')){
			return new SncfjsError(ErrorCodes.TokenMissing, response.message);
		}

		return new SncfjsError(ErrorCodes.UnknownError, response?.response?.data?.message);
	}
}