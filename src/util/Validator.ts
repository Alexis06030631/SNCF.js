/**
 * Check if is a valid ID
 * @param string - The string to check
 */
export function isValidID(string:string):boolean {
	return /\w+:\w+:\d+/g.test(string);
}

/**
 * Check if is a valid Line ID
 * @param string - The string to check
 */
export function isValidLineID(string:string):boolean {
	return /line:\w+:\w+:[\w]*:?:?[\w]*:?/g.test(string);
}