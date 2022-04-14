const axios = require("axios");
const baseUrl = 'https://api.navitia.io/v1/coverage/sncf/';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

async function requestSNCFapi(token, method, data='') {
    if(!token) throw 'TOKEN_INVALID';
    if(!method || !methods.includes(method)) throw 'METHOD_INVALID';

    data = data.replaceAll(' ', '%20')
    try{
        const res = await axios({
            method: method,
            url: baseUrl + data,
            headers: {
                'Authorization': token.replaceAll(' ', '%20')
            }
        })
        return res
    }catch(e){
        throw `Connection to SNCF api failed:\n${e.response.status} - ${e.response.statusText}: ${e.response.data.message}`
    }
}


module.exports = { requestSNCFapi };
