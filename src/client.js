const Formatter = require("./utils/date")
const axios = require("axios");
const baseUrl = 'https://api.navitia.io/v1/coverage/sncf/';

class Sncf {
  constructor() {
    //Sncf Token
    if (!this.token && 'SNCF_TOKEN' in process.env) this.token = process.env.SNCF_TOKEN;
    else this.token = null;

    // user info
    this.client = {
      connected: false,
      readyDate: '',
      connectionType: '',
      id: '',
      shape: '',
      timezone: '',
    }

  }

  async login(token = this.token) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');

    process.emit("debug", 'Preparing to connect to the api...');

    try {
      const response = await this.requestSNCFapi('GET');
      if(response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.data.message}`);
      }else {
        this.user = {
          connected: true,
          readyDate: response.data.regions[0].last_load_at,
          connectionType: response.data.regions[0].name,
          id: response.data.regions[0].id,
          shape: response.data.regions[0].shape,
          timezone: response.data.context.timezone
        };
        process.emit("debug", `Connected to the api as ${this.user.id}`);
      }
      return this.user
    } catch (error) {
      throw error;
    }
  }

  get readyAt() {
    return this.user.readyDate && Formatter.date(this.user.readyDate)
  }

  get connectionType() {
    return this.user.connectionType
  }

  get id() {
    return this.user.id
  }

  get shape() {
    return this.user.shape
  }

  get uptime() {
    return this.user.readyDate && Formatter.uptime(this.user.readyDate)
  }

  get timezone() {
    return this.user.timezone
  }

  requestSNCFapi(method, data='') {
    return new Promise( (resolve, reject) => {
      axios({
        method: method,
        url: baseUrl + data,
        headers: {
          'Authorization': this.token
        }
      }).then(response => {
        resolve({status: response.status, data:response.data});
      }).catch(error => {
        resolve({status: error.response.status, data:error.response.data});
      });
    })
  };
}

module.exports = Sncf;