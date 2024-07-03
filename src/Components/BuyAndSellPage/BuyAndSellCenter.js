import { useContext, useEffect, useState } from "react";
import Tabs from "../TableComponents/Tabs";
import TradeSearch from "./TradeSearch";
import { TradeContext } from "../../Pages/BuyAndSell";

export default function BuyAndSellCenter({height}){
    const [buyValue, setBuyValue] = useState("");
    const [sellValue, setSellValue] = useState("");
    const [crypto] = useContext(TradeContext);
    const [showTrade, setShowTrade] = useState(true);


    const formatTradeOrder = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleOrder = (e, option) => {
        const value = e.target.value.replace(/,/g, "");


        option == 'buy' ? setBuyValue(formatTradeOrder(value)) : setSellValue(formatTradeOrder(value));
    }

    function createBuyCenter(){
        return (
            <div className="flex flex-col justify-center items-center flex-1">
                <input
                 type='text'
                 className={`focus:outline-none text-center max-w-full p-5 text-8xl`}
                 placeholder="0"
                 value={buyValue}
                 onChange={(e) => handleOrder(e, 'buy')}
                 />

                <p className="text-2xl"> USDT </p>
            </div>
        );
    }

    function createSellCenter(){
        return(
            <p> This is the selling center. </p>
        );
    }

    return (
        <div className='bg-white w-full max-w-5xl mt-10 p-5 flex flex-col'>
            {showTrade ?
            <div className="flex flex-col max-h-full">
                <Tabs 
                    customs = {{
                        'Buy': createBuyCenter(),
                        'Sell': createSellCenter()
                    }}
                />
                <div className="border-t p-5 flex items-center w-full cursor-pointer" onClick={() => setShowTrade(false)}>

                    <img src={crypto.imgSrc} alt="React Image" className="max-w-8 max-h-8 border rounded-2xl p-1 mr-4" />
                    <div className="flex space-x-2">
                        <p className="text-lg">{crypto.abr.toUpperCase()}</p>
                        <p className="text-lg text-slate-300">{crypto.name}</p>
                    </div>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke={'grey'} 
                        className="size-8 p-1 cursor-pointer ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
            :
            <TradeSearch onBack={() => setShowTrade(true)} currentCrypto={crypto} height={height / 1.5}/>}
        </div>
    );
}