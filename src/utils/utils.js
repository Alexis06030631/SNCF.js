const axios = require("axios");
const moment = require("moment");

module.exports = {
    version: process.version,
    SNCFapi: 'https://api.navitia.io/v1/coverage/sncf/',
    SNCFapiVersion: 'v1',
    error: (error) => {
        switch (error?.response?.status) {
            case 401:
                return new Error(Error.code.TOKEN_INVALID)
            case 404:
                return []

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
            throw this.error(e)
        }
    },


    /**
     * Check if a date is valid
     * @param {string||Date} date The date to check
     * @param time
     * @param unit
     * @returns {string}
     */
    check_date(date, time = 0, unit = 'days') {
        let rdate = moment(date)

        if(!rdate.isValid()) {
            throw new Error(Error.code.DATE_MUST_BE_A_DATE)
        }

        rdate.add(time, unit);

        return rdate.format('YYYY-MM-DDTHH:mm:ss')
    },

    to_nativia_date(date) {
        return moment(date).format('YYYYMMDDTHHmmss')
    }
}