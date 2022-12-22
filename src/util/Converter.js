module.exports = {
	/**
	 * Transform a navitia date to a Date object
	 * @param date The navitia date format: YYYYMMDD[T]HHmmss
	 * @return {Date}
	 */
	navitiaDateToDate: (date) => {
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);
		const hour = date.substring(9, 11);
		const minute = date.substring(11, 13);
		const second = date.substring(13, 15);
		return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
	},

	/**
	 * Transform a Date object to a navitia date
	 * @param date The date to transform
	 * @return {string} The navitia date format: YYYYMMDD[T]HHmmss
	 */
	dateToNavitiaDate: (date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		const hour = date.getHours().toString().padStart(2, '0');
		const minute = date.getMinutes().toString().padStart(2, '0');
		const second = date.getSeconds().toString().padStart(2, '0');
		return `${year}${month}${day}T${hour}${minute}${second}`;
	},

	/**
	 * Transform a navitia date to a moment object (format: HHmmss to HH:mm:ss)
	 * @param data
	 * @return {Date}
	 */
	hourNativiaToHour: (data) => {
		const hour = data.substring(0, 2);
		const minute = data.substring(2, 4);
		const second = data.substring(4, 6);
		return `${hour}:${minute}:${second}`
	}
}