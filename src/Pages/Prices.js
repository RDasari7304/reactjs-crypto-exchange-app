import { useContext } from "react";
import { CryptoContext } from "../App";
import SearchBar from "../Components/PricesPage/SearchBar";

export default function Prices(){
    const [cryptoData, mktStats] = useContext(CryptoContext);
    const market_cap_trillions = (mktStats.total_market_cap / Math.pow(10, 12)).toFixed(2);

    return (
        <div className="w-full p-10">
            <div className="flex flex-col justify-center items-center m-10">
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
                <SearchBar />

            </div>
        </div>
    );
}