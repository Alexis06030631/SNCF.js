const axios = require("axios");
const util = require("./utils");
const places = require("./places");

class Client {
    #token
    constructor() {

        // Private properties
        this.#token = process.env.SNCF_TOKEN;

        // Public properties
        this.connected = false;
        this.readyDate = null;
        this.connectionType = null;
        this.id = null;
        this.shape = null;
        this.timezone = null;
        this.places = null;
    }

    login(token = this.#token) {
        return new Promise((resolve, reject) => {

            // Check and set the token
            if (!token) reject(new Error('TOKEN_INVALID'));
            token? this.#token = token : null

            // Establish the connection
            axios({
                method: 'GET',
                url: util.SNCFapi,
                headers: {
                    'Authorization': this.#token
                }
            }).then(res => {
                this.connected = true;
                this.readyDate = res.data.regions[0].last_load_at;
                this.connectionType = res.data.regions[0].name;
                this.id = res.data.regions[0].id;
                this.shape = res.data.regions[0].shape;
                this.timezone = res.data.context.timezone;
                this.places = new places(this.#token)
                resolve(this);
            }).catch(err => {
                reject(util.error(err.response));
            })
        })
    }

    logout() {
        this.connected = false;
        this.readyDate = null;
        this.connectionType = null;
        this.id = null;
        this.shape = null;
        this.timezone = null;
        this.places = null;
        return this;
    }

    get token() {
        return this.#token
    }
}

module.exports = Client;