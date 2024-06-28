import { CryptoContext } from "../App";
import { useContext, useState } from "react";
import CryptoTradeCard from "../Components/CryptoTradeCard";

export default function BuyAndSell(){
    const [cryptos] = useContext(CryptoContext);
    const [currentCrypto, setCurrentCrypto] = useState(33);

    return (
        <div className="flex justify-center items-center p-4">
            <div className="flex justify-center items-center w-full max-w-4xl">
                <CryptoTradeCard crypto={cryptos[currentCrypto]}/>
            </div>
        </div>
    );
}