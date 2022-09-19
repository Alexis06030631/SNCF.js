const axios = require("axios");
const moment = require("moment");
const {Base} = require("../../index");

module.exports = class Utils extends Base{
    constructor() {
        super()
        this.SNCFapi = 'https://api.sncf.com/v1/coverage/sncf/'
        this.version = process.version
    }

    error (error) {
        switch (error?.response?.status) {
            case 401:
                return new Error(Error.code.TOKEN_INVALID)
            case 404:
                return []

            default:
                return new Error(error)
        }
    }

    async request(url, method = 'GET', token = this.token) {
        try {
            if(!token) return new Error(Error.code.TOKEN_INVALID)
            if(token !== this.token) this.setToken(token)
            const data = await axios({
                method: method,
                url: encodeURI(this.SNCFapi + url),
                headers: {
                    'Authorization': this.token
                }
            })

            return data.data
        }catch (e) {
            throw this.error(e)
        }
    }

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
     }

     to_navitia_date(date) {
         return moment(date).format('YYYYMMDDTHHmmss')
     }

     date_options(since, until) {
         // Check if the dates are valid
         if(since) since = this.check_date(since);
         else since = this.check_date(new Date());

         if(until) until = this.check_date(until);
         else until = this.check_date(new Date(since), 1);

         return {
             since: this.to_navitia_date(since),
             until: this.to_navitia_date(until)
         }
     }
}