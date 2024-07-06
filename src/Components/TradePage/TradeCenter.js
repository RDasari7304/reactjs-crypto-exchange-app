import { useContext, useEffect, useState } from "react";
import Tabs from "../TableComponents/Tabs";
import TradeSearch from "./TradeComponents/TradeSearch";
import { TradeContext } from "../../Pages/TradePage";
import BuyComponent from "./TradeComponents/BuyComponent";
import SellComponent from "./TradeComponents/SellComponent";
import { formatDate } from "../../TestData/services";
import { updateUserData } from "../../TestData/services";

export default function TradeCenter({pageType, height}){
    const [crypto, ,userData, setUserData] = useContext(TradeContext);
    const [showTrade, setShowTrade] = useState(true);
    const [initialIndex, setInitialIndex] = useState(pageType == "sell" ? 1 : 0);
    
    
    const handleOrder = (orderType, orderValue, setLoading) => {
        const strippedValue = orderValue.replace(/[^0-9]/g, "");
        const amount = orderType == "Deposit" ? (strippedValue / crypto.price) : strippedValue;
        const fiatValue = orderType == "Deposit" ? -strippedValue : strippedValue * crypto.price;
        
        const [month, day, year, hour] = formatDate(new Date());

        const allTransactions = Object.entries(userData.assets).flatMap(([, value]) => value.transactions.map((transaction) => transaction));
        const asset = userData.assets[crypto.abr.toUpperCase()];
        const balance = asset ? asset.amount : 0;
        const newBalance = orderType == 'Deposit' ? balance + amount : balance - amount;

        const transaction = {
                                type: orderType, 
                                amount: amount, 
                                price: Number(crypto.price), 
                                balance: newBalance,
                                date: `${month} ${day} ${year}, ${hour}`,
                                transaction_id: allTransactions.length
                            }
        const transactions = asset ? [...asset.transactions, transaction] : [transaction];

        const updatedAsset = {amount: newBalance, transactions: transactions};
        const updatedAssets = {...userData.assets, [crypto.abr.toUpperCase()] : updatedAsset }
        const usdtBalance = userData.usdt_balance + fiatValue;
        updateUserData(userData.pk_users, {assets: JSON.stringify(updatedAssets), usdt_balance: usdtBalance});
        setUserData({...userData, assets: updatedAssets, usdt_balance: usdtBalance});
        setLoading(false);
    }

    return (
        <div className='bg-white w-full mt-10 p-5 flex flex-col'>
            {showTrade ?
                <div className="flex w-full flex-col max-h-full">
                    <Tabs 
                        customs = {{
                            'Buy': <BuyComponent exchangeBalance={userData.usdt_balance} onOrder={handleOrder} crypto={crypto} setShowTrade= {setShowTrade} setInitialIndex={setInitialIndex}/>,
                            'Sell': <SellComponent exchangeBalance={userData.assets[crypto.abr.toUpperCase()] ? userData.assets[crypto.abr.toUpperCase()].amount : 0} onSell={handleOrder} crypto={crypto} setShowTrade= {setShowTrade} setInitialIndex={setInitialIndex}/>
                        }}
                        active= {initialIndex}
                    />
                </div>
            :
            <TradeSearch tradeType = {initialIndex == 0 ? 'buy' : 'sell'} onBack={() => setShowTrade(true)} currentCrypto={crypto} height={height / 1.5}/>}
        </div>
    );
}