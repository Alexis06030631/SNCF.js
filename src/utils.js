module.exports = {
    version: process.version,
    SNCFapi: 'https://api.navitia.io/v1/coverage/sncf/',
    SNCFapiVersion: 'v1',
    error: (error) => {
        switch (error.code) {
            case 401:
                return new Error('TOKEN_INVALID');
            default:
                return new Error(error.data.message);
        }
    }
}