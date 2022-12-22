const StopArea = require('./StopArea');

module.exports = {
	createStopArea: (data) => {
		return new StopArea(data);
	}
}