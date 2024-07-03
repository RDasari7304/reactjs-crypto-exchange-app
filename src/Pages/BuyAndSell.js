import { CryptoContext } from "../App";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import CryptoTradeCard from "../Components/BuyAndSellPage/CryptoTradeCard";
import { useLocation } from "react-router-dom";
import BuyAndSellCenter from "../Components/BuyAndSellPage/BuyAndSellCenter";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export const TradeContext = createContext();

export default function BuyAndSell(){
    let query = useQuery();
    const cryptoIndex = query.get('cryptoIndex');

    const [cryptos] = useContext(CryptoContext);
    const [tradeCardHeight, setTradeCardHeight] = useState(0);

    const [crypto, setCurrentCrypto] = useState(cryptos[cryptoIndex ? cryptoIndex : 0]);

    return (
        <TradeContext.Provider value={[crypto, setCurrentCrypto]}>
            <div className="flex justify-center items-center p-4 h-full">
                <div className="flex flex-col items-center w-full mt-10">
                    <CryptoTradeCard passHeight={setTradeCardHeight}/>
                    <BuyAndSellCenter height= {tradeCardHeight}/>
                </div>
            </div>
        </TradeContext.Provider>
    );
}