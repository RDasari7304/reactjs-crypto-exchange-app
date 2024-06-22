export default function CryptoData({crypto, logoSrc, pair, price, change, volume}){
    return (
        <tr>
                <td className="border-t border-b p-4">
                    <div className="flex items-center">
                        <img src={logoSrc} alt="React Image" className="max-w-8 max-h-8 mr-3" />
                        <div className="flex flex-col">
                            <span className="font-medium text-md">{crypto}</span>
                            <span className="text-slate-500">{pair}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f0b90b" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f0b90b" className="size-6 ml-auto mr-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                    </div>
                </td>
                <td className="border-t border-b p-4 font-medium">$ {Number(price).toLocaleString('en')}</td>
                <td className="border-t border-b p-4 ">
                    <button className="px-2 py-1" style={{'backgroundColor': '#fef2f1', 'fontSize': '16px', 'borderRadius': '40%', 'color': '#F84960'}}> {change}% </button>
                </td>
                <td className="border-t border-b p-4">{Number(volume).toLocaleString('en')}</td>
        </tr>
    );
}