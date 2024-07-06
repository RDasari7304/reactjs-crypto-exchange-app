import { CryptoContext } from "../App";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import CryptoCard from "../Components/TradePage/CryptoCard";
import { useLocation } from "react-router-dom";
import TradeCenter from "../Components/TradePage/TradeCenter";
import Tabs from "../Components/TableComponents/Tabs";
import TransactionsTable from "../Components/TradePage/Table/TransactionsTable";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export const TradeContext = createContext();

export default function Trade(){
    let query = useQuery();
    const cryptoIndex = query.get('cryptoIndex');
    const pageType = query.get('page');

    const [cryptos, , , userData, setUserData] = useContext(CryptoContext);
    const [tradeCardHeight, setTradeCardHeight] = useState(0);

    const [crypto, setCurrentCrypto] = useState(cryptos[cryptoIndex ? cryptoIndex : 0]);



    return (
        <TradeContext.Provider value={[crypto, setCurrentCrypto, userData, setUserData]}>
            <div className="h-full pt-10">
                <div className="flex flex-row w-full space-x-4 justify-center">
                    <div className="flex flex-col items-center w-full max-w-5xl">
                        <CryptoCard passHeight={setTradeCardHeight}/>
                        <TradeCenter pageType={pageType} height= {tradeCardHeight}/>
                    </div>
                    <div className="bg-white w-full max-w-4xl p-5">
                        <Tabs 
                            customs={{
                                'Account Transaction History': <TransactionsTable cryptos= {cryptos} assets= {userData.assets}/>
                            }}
                        />
                    </div>
                </div>
            </div>
        </TradeContext.Provider>
    );
}