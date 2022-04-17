const Formatter = require("./utils/date")
const {requestSNCFapi} = require("./utils/api");

class Sncf {
  constructor(user) {
    //Sncf Token
    if (!this.token && 'SNCF_TOKEN' in process.env) this.token = process.env.SNCF_TOKEN;
    else this.token = null;

    // user info
    this.client = user || {
      connected: false,
      readyDate: '',
      connectionType: '',
      id: '',
      shape: '',
      timezone: '',
    }
  }
  Line = require('./lines/line')

  async login(token = this.token) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
    if(this.token !== token) this.token = token;

    process.emit("debug", 'Preparing to connect to the api...');

    try {
      const response = await this.requests('GET');
      this.user = {
        connected: true,
        readyDate: response.data.regions[0].last_load_at,
        connectionType: response.data.regions[0].name,
        id: response.data.regions[0].id,
        shape: response.data.regions[0].shape,
        timezone: response.data.context.timezone
      };
      process.emit("debug", `Connected to the api as ${this.user.id}`);
      return this.user
    } catch (error) {
      throw error;
    }
  }

  requests(method, url) {
    return requestSNCFapi(this.token, method, url)
  }


  // Callback module
  failed(message) {
    return {
      status: 'error',
      message: message
    };
  }

  return_values(type, status, data) {
    let length
    if(!type.match(/[s]$/gm)){
      data = data[0]
      length = 1
    }else length = data?.length || 0;
    return {
      status: status || data?.length? 200 : 404,
      length: length,
      [type]: data || {message: `${type} no found`}
    };
  }

  inclresp(type, response) {
    if(response.status === 200){
      let resp = {}
      let data = response.data[`${type}s`][0]
      if(data){
        switch (type) {
          case 'line':
            resp = Object.create(new this.Line(this.user, data))
            break
        }
        resp.length = response.data[`${type}s`].length || 0
        resp.status = response.status || 200
        Object.assign(resp, data)
      }else resp = {status: response.status || 404, message: `${type} no found`}
      return resp
    }else return {status: response.status || 404, message: `${type} no found`}
  }

  inclMultresp(type, responses){
    let resp = {}
    if(responses.status === 200){
      let data = responses.data[type]
      if(data){
        switch (type) {
          case 'vehicle_journeys':
            const daysTrain = data.map(line => {
              let line_resp = []
              delete line.validity_pattern
              line_resp.push(line)
              return line_resp
            })
            resp.daysTrain = daysTrain
            break
          default:
            resp[type] = data
            break
        }
        resp.length = responses.data[type].length || 0
        resp.status = responses.status || 200
      }else resp = {status: 404, message: `${type} no found`}
      return resp
    }else return {status: 404, message: `${type} no found`}
  }

}

module.exports = Sncf;