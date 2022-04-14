const Sncf = require("./client");

class User extends Sncf {

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
}

Sncf.prototype.user = new User()
module.exports.User = new User()