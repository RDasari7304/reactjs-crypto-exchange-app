import { putData } from "./dbfunctions";
import { fetchApi } from "./dbfunctions";

const updateUserData = async (pk_user, payload) => {
    const result = await putData(`http://localhost:3001/updateUser/${pk_user}`, payload);
}

const formatDate = (date) => {
    const time_stamp_sections = date.toString().split(" ");
            
    const month = time_stamp_sections[1];
    const day = time_stamp_sections[2];
    const year = time_stamp_sections[3];
    const hour = date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});

    return [month, day, year, hour];
}

async function fetchCryptoHistory(crypto, days){
    const result = await fetchApi('http://localhost:3001/fetchAPI', {
        params: {vs_currency: 'USD', days: days, precision: 6},
        endpoint: `https://api.coingecko.com/api/v3/coins/${crypto.coin_id.toLowerCase()}/market_chart`,
        headers: {'x-cg-demo-api-key': 'CG-o1pXq1qe5ANQmCa4dd5yQZza', 'Accept': 'application/json'}
    });

    const {data} = result;
    const prepared_data = Object.entries(data.prices).map((data_point) => {
        const data_piece = data_point[1];
        const date = new Date(data_piece[0]);

        const [month, day, year, hour] = formatDate(date);
        
        const time_stamp = `${month} ${day}, ${year} ${hour}`
        return {time_stamp: time_stamp, price: data_piece[1]};
    });
    
    return prepared_data;
}

export {updateUserData, formatDate, fetchCryptoHistory}