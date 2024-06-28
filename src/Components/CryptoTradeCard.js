import CryptoGraph from "./CryptoGraph";

export default function CryptoTradeCard({crypto}){
    return (
        <div className="flex flex-col w-full bg-white p-4 justify-start">
            <div className="flex items-center p-4">
                    <img src={crypto.imgSrc} alt="React Image" className="max-w-8 max-h-8 mr-4" />
                    <span className="text-slate-500 flex items-center" style={{'fontSize': '22px', 'fontFamily': 'Calibri'}}><p className="text-black">{crypto.abr.toUpperCase()}</p> /USDT</span>
            </div>
            <div className="flex items-baseline px-4">
                <p className="font-semibold" style={{'fontSize': '35px'}}> {parseFloat(crypto.price).toLocaleString('en')} </p>
                <p className="ml-2" style={{'fontSize': '25px'}}> USDT </p>
                <p className="ml-1" style={{'fontSize': '14px', 'color' : crypto.change > 0 ? '#3DCF50' : '#F84960'}}> {crypto.change > 0 ? '+' : ''}{crypto.change} %</p>
            </div>
            <CryptoGraph crypto={crypto} simple={false} />
        </div>
    );
}