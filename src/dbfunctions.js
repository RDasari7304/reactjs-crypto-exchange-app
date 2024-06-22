import axios from 'axios';

function fetchApi(endpoint, payload){
    return axios.get(endpoint, {
        params: {
            endpoint: payload.endpoint,
            headers: payload.headers
        }
    });
}

export {fetchApi}