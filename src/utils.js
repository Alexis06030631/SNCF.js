errors = [
    {
        code: 401,
        message: 'Token invalid'
    },
    {
        type: 'ID_INVALID',
        message: 'The id is not valid'
    },
    {
        type: 'ID_IS_NOT_A_NUMBER',
        message: 'The id is not a number'
    }
]

module.exports = {
    errors: errors.map(e => e.type),
    version: process.version,
    SNCFapi: 'https://api.navitia.io/v1/coverage/sncf/',
    SNCFapiVersion: 'v1',
    error: (error) => {
        switch (error?.response?.code) {
            case 401:
                return new Error(Error.code.ID_INVALID)

            default:
                return new Error(error)
        }
    },

}

// Doc errors code
