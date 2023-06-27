import {SncfjsError, ErrorCodes} from "../errors";


/**
 * Transform a navitia date to a Date object
 * @param date - The navitia date format: YYYYMMDD[T]HHmmss
 */
export function navitiaDateToDate (date:string): Date {
	const year = date.substring(0, 4);
	const month = date.substring(4, 6);
	const day = date.substring(6, 8);
	const hour = date.substring(9, 11);
	const minute = date.substring(11, 13);
	const second = date.substring(13, 15);
	return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
}

	/**
	 * Transform a Date object to a navitia date
	 * @param date - The date to transform
	 */
export function dateToNavitiaDate (date:Date|string):string {
	// Get date utc
	let initDate = date;
	// Check if the date is a string date or a Date object
	if (typeof date === 'string') date = new Date(date);
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new SncfjsError(ErrorCodes.InvalidDate, initDate);
	}
	const dateLocale:string = date.toLocaleDateString('fr-FR').replace(/\//g, '')
	return dateLocale.substring(4, 8) + dateLocale.substring(2, 4) + dateLocale.substring(0, 2) + 'T' + date.toLocaleTimeString('fr-FR').replace(/\//g, '')
}

	/**
	 * Transform a navitia date to a moment object (format: HHmmss to HH:mm:ss)
	 * @param data - The navitia date
	 * @param PassError - If true, return null instead of throwing an error
	 */
export function hourNativiaToHour (data:string, PassError?:boolean): string {
	if (data?.length !== 6 && !PassError) throw new Error('Invalid hour format');
	if(PassError && data?.length !== 6) return null;
	const hour = data.substring(0, 2);
	const minute = data.substring(2, 4);
	const second = data.substring(4, 6);
	return `${hour}:${minute}:${second}`
}