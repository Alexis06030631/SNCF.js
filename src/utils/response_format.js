module.exports = {
  // Callback module
  error: function(message) {
    return {
      status: 'error',
      message: message
    };
  },
  return_values: function(type, status, data) {
    if(!type.match(/[s]$/gm)){
      data = data[0]
      length = 1
    }else length = data?.length || 0;
    return {
      status: status || data?.length? 200 : 404,
      length: length,
      [type]: data || {message: `${type} no found`}
    };
  },
}