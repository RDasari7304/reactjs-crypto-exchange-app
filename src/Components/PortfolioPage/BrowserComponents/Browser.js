import Tabs from '../../TableComponents/Tabs'
import { CryptoContext } from '../../../App';
import { useContext } from 'react';
import BrowserTable from './BrowserTable';

export default function Browser(){

    const [cryptoData, , ,userData] = useContext(CryptoContext);
    const {favorites} = userData;

    const favoritesData = cryptoData.filter((crypto) => {
        return favorites.includes(crypto.abr);
    });

    const topGainers = cryptoData.filter((crypto) => {
        return crypto.change >= 0
    }).sort((crypto1, crypto2) => crypto2.change - crypto1.change);

    return (
        <div className=" bg-white max-w-7xl w-full ml-auto mr-auto mt-12 p-6" style={{ borderWidth: '1px', borderRadius: '4px' }}>
            <Tabs 
                customs = {{
                    'Favorites' : <BrowserTable data= {Object.values(favoritesData)}
                                     isFavoritable={true} isBrowser={true} showHeaders={true}/>,
                    'Top Gainers': <BrowserTable data= {Object.values(Object.fromEntries(Object.entries(topGainers).slice(0, 10)))} 
                                    isFavoritable={false} isBrowser={true} showHeaders={true}/>
                }}
            />
            <div className='flex justify-center mt-3'>
                <a href='/prices'>
                    <button className='trade-crypto-button text-md button-border' style={{ color: '#1E2026', padding: '5px 15px', borderRadius: '5px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}> 
                        See more
                    </button>
                </a>
            </div>
        </div>

    );
}