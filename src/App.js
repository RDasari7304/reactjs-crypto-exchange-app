import { useEffect, useState, createContext } from 'react';
import {fetchApi} from './dbfunctions.js';
import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';

export const CryptoContext = createContext();

function App() { 

  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch(){
        const result = await fetchApi('http://localhost:3001/fetchAPI', {
          endpoint: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          headers: {'X-CMC_PRO_API_KEY': '5ce5ef2b-e802-40f1-9f31-68d7c66b3597', 'Accept': 'application/json'}
        });

        const {data} = result.data;
        console.log(data);
        const cryptoData = await data.map((crypto) => {
          return {
            'name': crypto.name,
            'pair': `${crypto.name} / USDT`,
            'price': `${Number(crypto.quote.USD.price).toFixed(2)}`,
            'change': `${Number(crypto.quote.USD.percent_change_24h).toFixed(2)}`,
            'volume': `${Number(crypto.quote.USD.volume_24h).toFixed(2)}`,
            'abr': crypto.symbol.toLowerCase()
          }
        });

        setCryptos(cryptoData);
        setLoading(false);
    }

    fetch();
  }, []);

  return (
    <CryptoContext.Provider value={[cryptos]}>
      <div className={`App bg-slate-100 min-w-full min-h-screen ${loading ? 'flex justify-center items-center' : ''}`}>
        {loading ? 
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> 
          :
          <>
            <Navbar />
            <Profile />
          </>
        }
      </div>
    </CryptoContext.Provider>
  );
}

export default App;
