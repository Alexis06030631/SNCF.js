const moment = require('moment');

module.exports = {
    date(date, format) {
        date = date.toString()
        if(date.match('(^\\d{8})([T])(\\d{6})')) {
            date = moment().set(
                {
                    'year': date.slice(0, 4),
                    'month': date.slice(4, 6) - 1,
                    'date': date.slice(6, 8),
                    'hour': date.slice(9, 11),
                    'minute': date.slice(11, 13),
                    'second': date.slice(13, 15)
                }
            ).format();
        }else {
            try {
                date = moment(date).format(format);
            }catch(e) {
                throw `Failed to convert ${date} to a moment date.`;
            }
        }
        if (format) {
            date = moment(date).format(format);
        }
        return date;
    },

    /**
     * @param {Dates} dates The dates to be used in the query
     * @param {String} format Format to be used in the query
     * @returns {Object}
     */
    compareDates(dates, format = 'minutes') {
        if(dates.dateRef) {
            dateRef = this.date(dates.dateRef);
        }else dateRef = moment()
        dateToAnalyse = this.date(dates.dateToAnalyse);
        return moment(dateRef).diff(dateToAnalyse, format);
    }
}