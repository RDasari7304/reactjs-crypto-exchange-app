import { useEffect, useState } from "react";
import AddFavorite from "../AddFavorite";
import TradeButton from "../TradeButton";

export default function AdvancedData({name, pair, logoSrc, price, change, volume, market_cap, circulating_supply, total_supply, isFavorited}){
    const isPositive = change > 0;

    const [favoritedState, setFavoritedState] = useState(isFavorited);
    const percentChangeStyle = isPositive ? 
    {'backgroundColor': '#02C076', 'color': '#FFFFFF'} 
    : 
    {'backgroundColor': '#F84960', 'color': '#FFFFFF'}

    useEffect(() => {
        
    }, [favoritedState]);

    function formatNumber(num){
        if(num > 1.0e+9){
            return Number((num / 1.0e+9).toFixed(2)).toLocaleString('en') + " B";
        }else if(num > 1.0e+6){
            return Number((num / 1.0e+6).toFixed(2)).toLocaleString('en') + " M";
        }else if(num > 1.0e+3){
            return Number((num / 1.0e+3).toFixed(2)).toLocaleString('en') + " K";
        }
    }

    return (
        <tr>
            <td className="border-t border-b p-4">
                <AddFavorite isActive ={favoritedState} onClick={() => {setFavoritedState(!favoritedState)}}/>

            </td>
            <td className="border-t border-b p-4">
                <div className="flex items-center">
                    <img src={logoSrc} alt="React Image" className="max-w-8 max-h-8 mr-3" />
                    <div className="flex flex-col">
                        <span className="text-md">{name}</span>
                        <span className="text-slate-500">{pair.toUpperCase()}</span>
                    </div>
                </div>
            </td>
            <td className="border-t border-b p-4" style={{'fontSize': '18px', 'fontFamily': 'Calibri'}}>$ {Number(price).toLocaleString('en')}</td>
            <td className="border-t border-b p-4">
                <div className="w-full max-w-24">
                    <button className="py-1 w-full tracking-normal rounded-md font-medium" style={{'fontSize': '16px', ...percentChangeStyle, 'fontFamily': 'Calibri'}}> {isPositive ? '+' : ''} {change} % </button>
                </div>
            </td>
            <td className="border-t border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>{formatNumber(volume)}</td>
            <td className="border-t border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>{formatNumber(circulating_supply)}</td>
            <td className="border-t border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>{formatNumber(total_supply)}</td>
            <td className="border-t border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>{formatNumber(market_cap)}</td>
            <td className="border-t border-b p-4" style={{'fontFamily': 'Calibri', 'fontSize': '16px'}}>

                    <TradeButton />
                
            </td>
        </tr>
    );
}