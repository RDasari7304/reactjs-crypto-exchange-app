import Tabs from './TableComponents/Tabs'
import preferences from '../../../TestData/preferences.json';
import { CryptoContext } from '../../../App';
import { useContext } from 'react';

export default function Browser(){

    const cryptoData = useContext(CryptoContext);
    const {favorites} = preferences;

    const favoritesData = cryptoData[0].filter((crypto) => {
        return favorites.includes(crypto.abr);
    });

    const topGainers = cryptoData[0].filter((crypto) => {
        return crypto.change >= 0
    }).sort((crypto1, crypto2) => crypto2.change - crypto1.change);

    return (
        <div className=" bg-white w-full ml-auto mr-auto mt-12 p-6" style={{ borderWidth: '1px', borderRadius: '4px' }}>
            <Tabs 
                customs = {{
                    'Favorites' : {data: favoritesData, customizable: true},
                    'Top Gainers': {data: Object.fromEntries(Object.entries(topGainers).slice(0, 10)), customizable: false}
                }}
            />
            <div className='flex justify-center mt-3'>
                <button className='trade-crypto-button text-md button-border' style={{ color: '#1E2026', padding: '5px 15px', borderRadius: '5px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}> 
                    See more
                </button>
            </div>
        </div>

    );
}