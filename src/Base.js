module.exports = class BaseClient {
    #token
    constructor() {
        this.#token = process.env.SNCF_TOKEN || null
    }

    get token() {
        return this.#token
    }

    setToken(token) {
        this.#token = token
    }

    get api() {
        return 'https://api.sncf.com/v1/coverage/sncf/'
    }
}