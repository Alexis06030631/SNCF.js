module.exports = {
  places: function(status, data) {
    return {
      status: status,
      placeslength: data.length,
      places: data
    };
  },
  error: function(message) {
    return {
      status: 'error',
      message: message
    };
  }
}