import axios from 'axios';

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical';
const SYMBOL = 'DOGE';
const CURRENCY = 'USD';
const API_KEY = '5ce5ef2b-e802-40f1-9f31-68d7c66b3597'; // Replace with your CoinMarketCap API key

const getDogecoinPriceData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
      params: {
        symbol: SYMBOL,
        convert: CURRENCY,
        interval: 'minute',
        time_start: Math.floor(Date.now() / 1000) - 24 * 60 * 60,
        time_end: Math.floor(Date.now() / 1000),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Dogecoin price data', error);
    throw error;
  }
};

export default getDogecoinPriceData;