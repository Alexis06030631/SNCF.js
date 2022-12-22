module.exports = {
	/**
	 * Check if is a valid ID
	 * @param {string} string
	 * @returns {boolean}
	 */
	isValidID(string) {
		return /\w+:\w+:\d+/g.test(string);
	}
}