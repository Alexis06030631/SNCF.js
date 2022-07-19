const axios = require("axios");
module.exports = {
    version: process.version,
    SNCFapi: 'https://api.navitia.io/v1/coverage/sncf/',
    SNCFapiVersion: 'v1',
    error: (error) => {
        switch (error?.response?.status) {
            case 401:
                return new Error(Error.code.TOKEN_INVALID)

            default:
                return new Error(error)
        }
    },

    async request(token, url, method = 'GET') {
        try {
            const data = await axios({
                method: method,
                url: this.SNCFapi + url,
                headers: {
                    'Authorization': token
                }
            })

            return data.data
        }catch (e) {
            console.log(e)
            throw this.error(e)
        }
    }

}