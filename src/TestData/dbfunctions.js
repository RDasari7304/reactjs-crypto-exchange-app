import axios from 'axios';

function fetchApi(endpoint, payload = undefined){
    return axios.get(endpoint, payload ? {
        params: {...payload
        }
    }: {});
}

function putData(endpoint, payload, headers = {}){
    return axios.put(endpoint, payload, {headers});
}

export {fetchApi, putData}