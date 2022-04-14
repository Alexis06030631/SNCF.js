const Formatter = require("./utils/date")
const {requestSNCFapi} = require("./utils/api");

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
      throw new Error(error);
    }
  }

  requests(method, url) {
    return requestSNCFapi(this.token, method, url)
  }
}

module.exports = Sncf;