module.exports = {
  // Places module
  places: function(status, data) {
    return {
      status: status,
      length: data?.length || 0,
      places: data
    };
  },
  place: function(status, data) {
    return {
      status: status,
      place: data
    };
  },

  // Routes module
  routes: function(status, data) {
    return {
      status: status,
      length: data?.length || 0,
      routes: data
    };
  },
  route: function(status, data) {
    return {
      status: status,
      route: data
    };
  },

  // stop_areas module
  stop_areas: function(status, data) {
    return {
      status: status,
      length: data?.length || 0,
      stop_areas: data
    };
  },
  stop_areas_departure: function(status, data) {
    return {
      status: status,
      stop_areas: data
    };
  },
  stop_areas_departures: function(status, data) {
    return {
      status: status,
      length: data?.length || 0,
      stop_areas: data
    };
  },
  stop_areas_arrival: function(status, data) {
    return {
      status: status,
      stop_areas: data
    };
  },
  stop_areas_arrivals: function(status, data) {
    return {
      status: status,
      length: data?.length || 0,
      stop_areas: data
    };
  },

  // Callback module
  error: function(message) {
    return {
      status: 'error',
      message: message
    };
  }
}