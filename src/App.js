import { useEffect, useState, createContext } from 'react';
import {fetchApi} from './TestData/dbfunctions.js';
import './App.css';
import Navbar from './Components/Navbar';
import PricesPage from './Pages/PricesPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TradePage from './Pages/TradePage.js';
import ProfilePage from './Pages/ProfilePage.js';

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
          params: {vs_currency: 'USD'},
          endpoint: 'https://api.coingecko.com/api/v3/coins/markets',
          headers: {'x-cg-demo-api-key': 'CG-o1pXq1qe5ANQmCa4dd5yQZza', 'Accept': 'application/json'}
        });

        const {data} = await result;
        const cryptoData = await data.map((crypto, index) => {
          if(crypto.id == "bitcoin"){
            btc_dominance = crypto.fully_diluted_valuation;
          }

          totalMktCap += crypto.fully_diluted_valuation;

          return {
            'index': index,
            'coin_id': crypto.id,
            'name': crypto.name,
            'imgSrc': crypto.image,
            'price': `${Number(crypto.current_price).toFixed(8)}`,
            'change': `${Number(crypto.price_change_percentage_24h).toFixed(2)}`,
            'volume': `${Number(crypto.total_volume).toFixed(2)}`,
            'low_24': crypto.low_24h.toFixed(8),
            'high_24': crypto.high_24h.toFixed(8),
            'market_cap': crypto.fully_diluted_valuation,
            'abr': crypto.symbol.toLowerCase()
          }
        });


        const {data: userData} = await fetchApi('http://localhost:3001/fetchUser/4');
        const allocatedCryptos = cryptoData.filter((crypto) => {
          const cryptoAbrUpperCase = crypto.abr.toUpperCase();
          return Object.keys(userData.assets).includes(cryptoAbrUpperCase) || crypto.abr == 'usdt';
        });
        
        const formattedAllocations = allocatedCryptos.reduce((acc, crypto) => {
          acc[crypto.abr.toUpperCase()] = crypto;
          return acc;
        }, {});

        setUserData({...userData, 'allocated_cryptos': formattedAllocations});
        setCryptos(cryptoData);
        setMktStats({total_market_cap: totalMktCap, btc_dominance: (btc_dominance / totalMktCap) * 100 });
        setLoading(false);
    }

    fetch();
  }, []);

  return (
    <CryptoContext.Provider value={[cryptos, setCryptos, mktStats, userData, setUserData]}>
      <div className={`App bg-slate-50 min-w-full min-h-screen ${loading ? 'flex justify-center items-center' : ''}`}>
        {loading ? 
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> 
          :
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path = '/' element= {<ProfilePage />} />
              <Route path = '/trade-crypto' element= {<TradePage />} />
              <Route path = '/prices' element = {<PricesPage />} />
            </Routes>
          </BrowserRouter>
        }
      </div>
    </CryptoContext.Provider>
  );
}

export default App;
