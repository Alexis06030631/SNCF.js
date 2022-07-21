const util = require("./utils/utils");
const places = require("./places");
const lines = require("./lines");
const {Disruptions} = require("../index");

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
            util.request(this.#token, '', 'GET').then(r => {
                this.connected = true;
                this.readyDate = r.regions[0].last_load_at;
                this.connectionType = r.regions[0].name;
                this.id = r.regions[0].id;
                this.shape = r.regions[0].shape;
                this.timezone = r.context.timezone;
                //this.places = new places(this.#token)
                //this.lines = new lines(this.#token)
                //this.disruptions = new Disruptions(this.#token)
                resolve(this);
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