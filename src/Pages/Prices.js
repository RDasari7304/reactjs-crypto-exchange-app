import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../App";
import SearchBar from "../Components/PricesPage/SearchBar";
import Tabs from "../Components/TableComponents/Tabs.js";
import AdvancedTable from "../Components/PricesPage/AdvancedTable.js";

export default function Prices(){
    const [cryptoData, , mktStats] = useContext(CryptoContext);
    const market_cap_trillions = (mktStats.total_market_cap / Math.pow(10, 12)).toFixed(2);

    const [filterableData, setFilterableData] = useState([]);
    const [searchableData, setSearchableData] = useState([]);
    const [hideScreen, setHideScreen] = useState(false);

    useEffect(() => {
        setFilterableData(cryptoData.map((crypto, index) => ({...crypto, 'display': index < 20})));
        setSearchableData(cryptoData.map((crypto, index) => ({...crypto, 'display': false})));
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center mt-10">
                <p 
                className="flex" 
                style={{'fontSize': '30px', 'color': '#76808F'}}> 
                
                    Cryptocurrency prices, charts, and trends
                </p>
                <p 
                className="p-2 text-slate-300 flex" 
                style={{'fontSize': '25px', 'color': '#76808F'}}> 

                    The global cryptocurrency market cap today is 
                    <p className="px-2 text-yellow-400">{market_cap_trillions} T</p>
                    , with a btc dominance of <p className="text-red-400 px-2">{mktStats.btc_dominance.toFixed(2)} %</p>
                
                </p>
                <SearchBar data={searchableData} setData={setSearchableData} setHideScreen= {setHideScreen}/>
                <div className={`w-full p-10 ${hideScreen ? 'opacity-30' : ''}`}>
                <div className="w-full bg-white p-4 mt-16 border rounded-md">
                    <Tabs 
                        customs ={{
                            'Stablecoins': <AdvancedTable data= {filterableData} setData={setFilterableData} comparisonPair='usdt' />,
                            'BTC Pairs':  (
                                            <div className="flex justify-center items-center" style ={{'height': '50vh'}}>
                                                <p style={{"font-family": 'Calibri'}}> This application currently does not support BTC Pairs. </p>
                                            </div>
                                            )
                        }}
                    />
                </div>
                </div>
            </div>
        </div>
    );
}