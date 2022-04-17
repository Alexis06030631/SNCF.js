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
        let error
        if(e.response){
            switch (e.response.status) {
                case 404:
                    return {
                        status: 404,
                        message: 'NOT_FOUND'
                    }
                    break;
            }
            error = `${e.response.status} - ${e.response.statusText}: ${e.response.data.message}`
        }else{
            console.log(e.code)
            switch (e.code) {
                case 'ECONNREFUSED':
                    error = 'SERVER_REFUSED'
                    break;
                case 'ENOTFOUND':
                    error = 'SERVER_NOT_FOUND'
                    break;
                default:
                    error = e.code
                    break;
            }
        }

        throw `Connection to SNCF api failed:\n${error}`
    }
}


module.exports = { requestSNCFapi };
