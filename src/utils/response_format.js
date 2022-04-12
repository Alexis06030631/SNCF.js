module.exports = {
  places: function(status, data) {
    return {
      status: status,
      placeslength: data?.length || 0,
      places: data
    };
  },
  place: function(status, data) {
    return {
      status: status,
      place: data
    };
  },
  error: function(message) {
    return {
      status: 'error',
      message: message
    };
  }
}