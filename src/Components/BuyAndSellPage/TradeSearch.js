import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../App";

export default function TradeSearch({onBack, currentCrypto, height}){
    const [cryptos] = useContext(CryptoContext);
    const [filterKey, setFilterKey] = useState("");
    const [searchableCryptos, setSearchableCryptos] = useState([]);

    const navigateToCryptoPage = (index) => {
        window.location.href = `/buy-sell-crypto?cryptoIndex=${index}`;
    }

    useEffect(() => {
        console.log("hello");
        const useableData = cryptos.map((crypto) => {
            const lowerName = crypto.name.toLowerCase();
            const lowerAbr = crypto.abr.toLowerCase();
            const lowerFilter = filterKey.toLowerCase();

            const shouldDisplay = lowerFilter == "" || lowerName.startsWith(lowerFilter) || lowerAbr.startsWith(lowerFilter);
            return ({...crypto, display: shouldDisplay})
        });

        setSearchableCryptos(useableData);
    }, [filterKey]);

    return (
        <div className="flex flex-col pb-10" style={{'height': height}}>
            <div className="flex items-center pb-2 mb-5 border-b">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke={'currentColor'} 
                onClick={() => onBack()}
                className={`size-8 mr-2 p-1 cursor-pointer`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p style={{'fontFamily': "Calibri"}} className="text-2xl"> Select Coin </p>
            </div>
            <div className="relative w-full flex justify-center">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                        
                    <input type='search' 
                    onChange={(e) => setFilterKey(e.target.value)}
                    className="w-full focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 text-md ps-10 p-3 border border-gray-200 rounded-md bg-gray-50" 
                    placeholder="Search"/>  
                </div>
            </div>
            <div className="flex flex-col w-full overflow-x-hidden overflow-scroll mt-5 sleek-scrollbar">
                {searchableCryptos.map((crypto) => {
                    return crypto.display && 

                        <div 
                        onClick={() => navigateToCryptoPage(crypto.index)} 
                        className=" pl-1 pt-3 pb-3 flex items-center w-full cursor-pointer hover:bg-gray-100">
                            <img src={crypto.imgSrc} alt="React Image" className="max-w-8 max-h-8 border rounded-2xl p-1 mr-3" />
                            <div className="flex space-x-4 items-center">
                                <p style={{'fontFamily': 'Calibri'}} className="text-lg">{crypto.abr.toUpperCase()}</p>
                                <p style={{'fontFamily': 'Calibri'}}  className="text-sm ">{crypto.name}</p>
                            </div>
                            {(currentCrypto.index == crypto.index &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f0b90b" className="size-5 ml-auto mr-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                            )}
                        </div>
                })}
            </div>

        </div>
    )
}