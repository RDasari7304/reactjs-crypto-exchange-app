export default function Transaction({asset, data}){
    const isDeposit = data.type == 'Deposit';
    console.log(asset);
    return (
        <tr className="border-b">
            <td className="p-4" style={{'fontFamily': 'Calibri'}}>
                <div className="flex items-center space-x-2">
                    <img src={asset.imgSrc} className="w-6 h-6"/>
                    <p>{asset.abr.toUpperCase()} {data.type}</p>
                </div>
            </td>
            <td className="p-2" style={{'fontFamily': 'Calibri'}}>
                $ {data.price}
            </td>
            <td className={`p-2 ${isDeposit ? 'text-green-400' : 'text-red-400'}`} style={{'fontFamily': 'Calibri'}}>
                {Number(data.amount).toFixed(2)}
            </td>
            <td className="p-2" style={{'fontFamily': 'Calibri'}}>
                {data.date}
            </td>
        </tr>
    );
}