import rndr from '../../Images/PortfolioPage/CryptoLogos/rndr.png';
import btc from '../../Images/PortfolioPage/CryptoLogos/bitcoin.png';

export default function Browser(){
    return (
        <div className="bg-slate-100 w-full max-w-6xl ml-auto mr-auto mt-16 py-6" style={{ borderWidth: '1px', borderRadius: '4px' }}>
            <table className="border-collapse table-auto w-full text-sm">
                {/* Column group allows to style each individual column */}
                <colgroup> 
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                    <col style={{width: '25%'}} />
                </colgroup>
                <thead>
                    <tr>
                        <th className="border-b font-extralight p-4 text-slate-400 text-left">Pair</th>
                        <th className="border-b font-extralight p-4 text-slate-400 text-left">Price</th>
                        <th className="border-b font-extralight p-4 text-slate-400 text-left">24 Hour Change</th>
                        <th className="border-b font-extralight p-4 text-slate-400 text-left">24 Hour Volume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-t border-b p-4">
                            <div className="flex items-center">
                                <img src={rndr} alt="React Image" className="max-w-8 max-h-8 mr-3" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-md">Render Token</span>
                                    <span className="text-slate-500">RNDR / USDT</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#f0b90b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f0b90b" className="size-6 ml-auto mr-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>

                            </div>
                        </td>
                        <td className="border-t border-b p-4 font-medium">$ 7.745</td>
                        <td className="border-t border-b p-4 ">
                            <button className="px-2 py-1" style={{'background-color': '#fef2f1', 'font-size': '16px', 'border-radius': '40%', 'color': '#F84960'}}> -1.87% </button>
                        </td>
                        <td className="border-t border-b p-4">500,242.63</td>
                    </tr>
                    <tr>
                        <td className="border-t border-b p-4">
                            <div className="flex items-center">
                                <img src={btc} alt="React Image" className="max-w-8 max-h-8 mr-3" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-md">Bitcoin</span>
                                    <span className="text-slate-500">BTC / USDT</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#f0b90b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f0b90b" className="size-6 ml-auto mr-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>

                            </div>
                        </td>
                        <td className="border-t border-b p-4 font-medium">$ 65,433.74</td>
                        <td className="border-t border-b p-4 ">
                            <button className="px-2 py-1" style={{'background-color': '#fef2f1', 'font-size': '16px', 'border-radius': '40%', 'color': '#F84960'}}> -1.87% </button>
                        </td>
                        <td className="border-t border-b p-4">5,000,242.63</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}