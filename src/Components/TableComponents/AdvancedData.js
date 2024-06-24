export default function AdvancedData({name, pair, logoSrc, price, change, volume, market_cap, circulating_supply, total_supply}){
    const isPositive = change > 0;

    const percentChangeStyle = isPositive ? 
    {'backgroundColor': '#02C076', 'color': '#FFFFFF'} 
    : 
    {'backgroundColor': '#F84960', 'color': '#FFFFFF'}

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
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} stroke="#e6e8ea" 
                    className="size-7 ml-auto mr-5 cursor-pointer"
                    onClick={() => {
                                    
                    }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>

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

                    <button className='text-md ml-auto mr-auto px-3 py-1 rounded-md flex items-center justify-center' style={{'backgroundColor': '#F0B90B'}}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" class="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                        
                        Trade Crypto 
                    </button>
                
            </td>
        </tr>
    );
}