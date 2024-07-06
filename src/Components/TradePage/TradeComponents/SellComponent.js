import { useState } from "react";
import ChangeCurrency from "./ChangeCurrency";

export default function SellComponent({exchangeBalance, onSell, crypto, setShowTrade, setInitialIndex}){
    const [sellValue, setSellValue] = useState("");
    const [overSpend, setOverSpend] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [processingOrder, setProcessingOrder] = useState(false);
    
    const formatTradeOrder = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const stripValue = (value) => {
        return value.replace(/[^0-9]/g, "");
    }

    const handleInput = (e) => {
        const value = stripValue(e.target.value);
        setOverSpend(value > exchangeBalance);
        setSellValue(formatTradeOrder(value));
    }

    return (
        <div className="flex flex-col justify-center items-center flex-1">
            <input
             type='text'
             className={`focus:outline-none text-center max-w-full p-5 text-8xl`}
             placeholder="0"
             value={sellValue}
             onChange={(e) => handleInput(e)}
             />

            <p className="text-2xl"> {crypto.abr.toUpperCase()} </p>
            {overSpend && <p className={`text-red-300 p-2 ${animate && 'animate-bounce'}`}> Your sell order exceeds your available {crypto.abr.toUpperCase()} balance </p>}
            <ChangeCurrency balance={exchangeBalance} value={sellValue} exchangeType= 'CryptoToUSDT' setShowTrade= {setShowTrade} setInitialIndex= {setInitialIndex} crypto={crypto}/>
            
            <button 
            onClick={() => {
                if(!overSpend){
                    onSell('Withdraw', sellValue, setProcessingOrder);
                    setSellValue("");
                }else{
                    setAnimate(true); 
                    setTimeout(() => setAnimate(false), 500);
                }
            }}
            disabled={processingOrder || sellValue == ""}
            className="disabled:bg-gray-100 bg-yellow-500 rounded-sm p-2 mt-6 w-full" 
            style={{'fontFamily': 'Calibri'}}> Preview Order </button>
        </div>
    );
}