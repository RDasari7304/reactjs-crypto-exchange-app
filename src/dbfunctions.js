import axios from 'axios';

function fetchApi(endpoint, payload = undefined){
    return axios.get(endpoint, payload ? {
        params: {
            endpoint: payload.endpoint,
            headers: payload.headers
        }
    }: {});
}

function putData(endpoint, payload, headers = {}){
    return axios.put(endpoint, payload, {headers});
}

export {fetchApi, putData}