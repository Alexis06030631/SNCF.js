const axios = require("axios");
const moment = require("moment");
const {Base} = require("../../index");

module.exports = class Utils extends Base{
    constructor() {
        super()
        this.version = process.version
    }

    error (error) {
        switch (error?.response?.status) {
            case 401:
                return new Error(Error.code.TOKEN_INVALID)
            case 404:
                if(error.response.data?.error?.message){
                    return new Error(error.response.data?.error?.id + ': ' + error.response.data.error.message)
                }else return new Error(Error.code.NOT_FOUND)

            default:
                return new Error(error)
        }
    }

    async request(url, method = 'GET') {
        try {
            if(super.debug) console.log(encodeURI(super.api + url))
            const data = await axios({
                method: method,
                url: encodeURI(super.api + url),
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

     date_options(since, until, sinceName='since', UntilName='until') {
         // Check if the dates are valid
         if(since) since = this.to_navitia_date(this.check_date(since));

         if(until) until = this.to_navitia_date(this.check_date(until));

         // return as url params
         return `${since? `${sinceName}=${since}${until? `&${UntilName}=${until}&`: '&'}`: until? `${UntilName}=${until}&`: ''}`
     }
}