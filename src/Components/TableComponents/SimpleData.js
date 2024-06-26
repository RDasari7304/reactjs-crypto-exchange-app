import TradeButton from "../TradeButton";

export default function CryptoData({crypto, logoSrc, pair, price, change, volume, customs}){
    const isPositive = change >= 0;
    const percentChangeStyle = isPositive ? 
    {'backgroundColor': '#f1fef2', 'color': '#3DCF50'} 
    : 
    {'backgroundColor': '#fef2f1', 'color': '#F84960'}

    return (
        <tr className="hover:bg-gray-100">
                <td className="border-b p-4">
                    <div className="flex items-center">
                        <img src={logoSrc} alt="React Image" className={customs.isBrowser ? "max-w-8 max-h-8 mr-3" : "max-w-6 max-h-6 mr-3"} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{crypto}</span>
                            <span className="text-slate-500 text-sm">{pair.toUpperCase()}</span>
                        </div>

                        {customs.favoritable ?
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="#f0b90b" viewBox="0 0 24 24" 
                                strokeWidth={1.5} stroke="#f0b90b" 
                                className="size-6 ml-auto mr-5 cursor-pointer"
                                onClick={() => {
                                    
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            :
                            <></>
                        }
                    </div>
                </td>
                <td className="border-b p-4" style={{'fontWeight': '500', 'fontSize': customs.isBrowser ? "16px" : "14px", 'fontFamily': 'Calibri'}}>${Number(price).toLocaleString('en')}</td>

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
                        <TradeButton />
                    </td>
                </>
                }
        </tr>
    );
}