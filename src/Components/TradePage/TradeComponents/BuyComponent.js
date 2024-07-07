import { useState } from "react";
import ChangeCurrency from "./ChangeCurrency";

export default function BuyComponent({exchangeBalance, onPreview, crypto, setOrderType, setOrderValue, setShowTrade, setInitialIndex}){
    const [buyValue, setBuyValue] = useState("");
    const [overSpend, setOverSpend] = useState(false);
    const [animate, setAnimate] = useState(false);

    
    const formatTradeOrder = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const stripValue = (value) => {
        return value.replace(/[^0-9.]/g, "");
    }

    const handleInput = (e) => {
        const value = stripValue(e.target.value);
        setOverSpend(value > exchangeBalance);
        setBuyValue(formatTradeOrder(value));
    }

    return (
        <div className="flex flex-col justify-center items-center flex-1">
            <input
             type='text'
             className={`focus:outline-none text-center max-w-full p-5 text-8xl`}
             placeholder="0"
             value={buyValue}
             onChange={(e) => handleInput(e)}
             />

            <p className="text-2xl"> USDT </p>
            {overSpend && <p className={`text-red-300 p-2 ${animate && 'animate-bounce'}`}> Your buy order exceeds your available USDT balance </p>}
            <ChangeCurrency balance={exchangeBalance} value={buyValue} crypto={crypto} exchangeType= 'USDTtoCrypto' setShowTrade= {setShowTrade} setInitialIndex= {setInitialIndex}/>
            
            <button 
            onClick={() => {
                if(!overSpend){
                    setOrderType('Deposit');
                    setOrderValue(buyValue);
                    onPreview();
                }else{
                    setAnimate(true); 
                    setTimeout(() => setAnimate(false), 500);
                }
            }}
            disabled={buyValue == ""}
            className="disabled:bg-gray-100 bg-yellow-500 rounded-sm p-2 mt-6 w-full" 
            style={{'fontFamily': 'Calibri'}}> Preview Order </button>
        </div>
    );
}