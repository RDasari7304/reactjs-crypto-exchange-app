import { useNavigate } from "react-router-dom";
import AddFavorite from "../AddFavorite";
import TradeButton from "../TradeButton";

export default function SimpleCryptoData({index, crypto, abr, logoSrc, pair, price, change, volume, customs, onClick}){
    const isPositive = change >= 0;
    const percentChangeStyle = isPositive ? 
    {'backgroundColor': '#f1fef2', 'color': '#3DCF50'} 
    : 
    {'backgroundColor': '#fef2f1', 'color': '#F84960'}
  
    return (
        <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => onClick()}>
                <td className="border-b p-4">
                    <div className="flex items-center">
                        <img src={logoSrc} alt="React Image" className={customs.isBrowser ? "max-w-8 max-h-8 mr-4" : "max-w-6 max-h-6 mr-3"} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{crypto}</span>
                            <span className="text-slate-500 text-sm">{pair.toUpperCase()}</span>
                        </div>

                        {customs.favoritable ?
                            <AddFavorite isActive= {true} onToggle={() => {}} value= {abr}/>
                            :
                            <></>
                        }
                    </div>
                </td>
                <td className="border-b p-4" style={{'fontWeight': '500', 'fontSize': customs.isBrowser ? "16px" : "14px", 'fontFamily': 'Calibri'}}>${ price > .1 ? Number(price).toLocaleString('en') : price}</td>

                {customs.isBrowser ? 
                <>
                    <td className="border-b p-4 ">
                        <div className="w-full max-w-24">
                            <button className="w-full px-2 py-1 rounded-md" style={{'fontSize': '16px', ...percentChangeStyle}}> {isPositive ? '+' : ''} {change} % </button>
                        </div>
                    </td>
                    <td className="border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>{Number(volume).toLocaleString('en')}</td>
                </>
                :
                <>
                    <td className="border-b p-4" style={{'fontFamily': 'Calibri', 'color': isPositive ? '#3DCF50' : '#F84960', 'fontSize': '15px'}}>
                        {isPositive ? '+ ' : ''} {change} %
                    </td>
                    <td className="border-b">
                        <TradeButton index={index}/>
                    </td>
                </>
                }
        </tr>
    );
}