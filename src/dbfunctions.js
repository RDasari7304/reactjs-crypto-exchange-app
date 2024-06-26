import axios from 'axios';

function fetchApi(endpoint, payload = undefined){
    return axios.get(endpoint, payload ? {
        params: {
            endpoint: payload.endpoint,
            headers: payload.headers
        }
    }: {});
}

export {fetchApi}