import { useEffect, useState, createContext } from 'react';
import {fetchApi} from './dbfunctions.js';
import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';
import Prices from './Pages/Prices.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const CryptoContext = createContext();

function App() { 

  const [cryptos, setCryptos] = useState([]);
  const [mktStats, setMktStats] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let totalMktCap = 0;
    let btc_dominance = 0;
    async function fetch(){
        const result = await fetchApi('http://localhost:3001/fetchAPI', {
          endpoint: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          headers: {'X-CMC_PRO_API_KEY': '5ce5ef2b-e802-40f1-9f31-68d7c66b3597', 'Accept': 'application/json'}
        });

        const {data} = result.data;
        const cryptoData = await data.map((crypto) => {
          if(crypto.id == 1){
            btc_dominance = crypto.quote.USD.market_cap_dominance;
          }

          totalMktCap += crypto.quote.USD.fully_diluted_market_cap;

          return {
            'name': crypto.name,
            'price': `${Number(crypto.quote.USD.price).toFixed(2)}`,
            'change': `${Number(crypto.quote.USD.percent_change_24h).toFixed(2)}`,
            'volume': `${Number(crypto.quote.USD.volume_24h).toFixed(2)}`,
            'circulating_supply': crypto.circulating_supply,
            'total_supply': crypto.total_supply,
            'market_cap': crypto.quote.USD.fully_diluted_market_cap,
            'abr': crypto.symbol.toLowerCase()
          }
        });

        const {data: userData} = await fetchApi('http://localhost:3001/fetchUser/4');

        setUserData(userData);
        setCryptos(cryptoData);
        setMktStats({total_market_cap: totalMktCap, btc_dominance: btc_dominance});
        setLoading(false);
    }

    fetch();
  }, []);

  return (
    <CryptoContext.Provider value={[cryptos, setCryptos, mktStats, userData]}>
      <div className={`App bg-slate-50 min-w-full min-h-screen ${loading ? 'flex justify-center items-center' : ''}`}>
        {loading ? 
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> 
          :
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path = '/' element= {<Profile />} />
              <Route path = '/prices' element = {<Prices />} />
            </Routes>
          </BrowserRouter>
        }
      </div>
    </CryptoContext.Provider>
  );
}

export default App;
