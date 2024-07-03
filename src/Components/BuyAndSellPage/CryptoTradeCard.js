import { useContext, useEffect, useRef, useState } from "react";
import CryptoGraph from "../CryptoGraph";
import { TradeContext } from "../../Pages/BuyAndSell";

export default function CryptoTradeCard({passHeight}){
    const [chartPeriod, setChartPeriod] = useState('daily');
    const [chartLoaded, setChartLoaded] = useState(false);
    const [crypto] = useContext(TradeContext);
    const containerRef = useRef(null);

    useEffect(() => {
        if(containerRef.current && passHeight){
            passHeight(containerRef.current.clientHeight);
        }
    }, [chartLoaded]);

    return (
        <div className="flex flex-col w-full bg-white p-4 justify-start max-w-5xl" ref={containerRef}>
            <div className="flex items-center p-4">
                    <img src={crypto.imgSrc} alt="React Image" className="max-w-8 max-h-8 mr-4" />
                    <span className="text-slate-500 flex items-center" style={{'fontSize': '22px', 'fontFamily': 'Calibri'}}><p className="text-black">{crypto.abr.toUpperCase()}</p> /USDT</span>
            </div>
            <div className="flex w-full mb-4">
                <div className="flex items-baseline px-4 w-full">
                    <p className="font-semibold" style={{'fontSize': '35px'}}> { crypto.price > .1 ? parseFloat(crypto.price).toLocaleString('en') : crypto.price} </p>
                    <p className="ml-2" style={{'fontSize': '25px'}}> USDT </p>
                    <p className="ml-1" style={{'fontSize': '14px', 'color' : crypto.change > 0 ? '#3DCF50' : '#F84960'}}> {crypto.change > 0 ? '+' : ''}{crypto.change} %</p>
                </div>
                <div className="flex items-center w-full justify-end text-gray-400 space-x-6 mr-4" style= {{'fontSize': '12px'}}>
                    <p className={`cursor-pointer ${chartPeriod == 'hourly' && 'text-black'}`} onClick={() => setChartPeriod('hourly')}>1H</p>
                    <p className={`cursor-pointer ${chartPeriod == 'daily' && 'text-black'}`} onClick={() => setChartPeriod('daily')}>1D</p>
                    <p className={`cursor-pointer ${chartPeriod == 'weekly' && 'text-black'}`} onClick={() => setChartPeriod('weekly')}>1W</p>
                    <p className={`cursor-pointer ${chartPeriod == 'monthly' && 'text-black'}`} onClick={() => setChartPeriod('monthly')}>1M</p>
                    <p className={`cursor-pointer ${chartPeriod == 'yearly' && 'text-black'}`} onClick={() => setChartPeriod('yearly')}>1Y</p>
                </div>
            </div>
            <CryptoGraph setChartLoaded={setChartLoaded} crypto={crypto} type={chartPeriod} simple={false} />
        </div>
    );
}