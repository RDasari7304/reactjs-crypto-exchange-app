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

    return (
        <div className="bg-white w-full ml-auto mr-auto mt-12 p-6" style={{ borderWidth: '1px', borderRadius: '4px' }}>
            <Tabs 
                customs = {{
                    'Favorites' : favoritesData,
                    'Top Gainers': {},
                    'Trending': {},
                }}
            />
        </div>

    );
}