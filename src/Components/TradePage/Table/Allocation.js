import { useState } from 'react';
import TradeButton from '../../TradeButton';
import AllocationCircle from './AllocationCircle';

export default function Allocation({symbol, name, index, imgSrc, allocation, balance, fiat}){
    const formattedBalance = Number(balance).toLocaleString('en');
    const formattedFiat = Number((balance * fiat).toFixed(2)).toLocaleString('en');
    const [showButtons, setShowButtons] = useState(false);

    return (
        <tr className='border-b' onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
            <td>
                <div className="flex items-center p-2 space-x-4 text-gray-700" style={{'fontFamily': 'Calibri'}}>
                    <img src={imgSrc} className='w-6 h-6'/>
                    <p className='text-base'>{symbol}</p>
                    <p className='text-base'>{name}</p>
                </div>
            </td>
            <td>
                <div className='flex items-center space-x-4 text-gray-700 p-2'>
                    <AllocationCircle percentage={allocation} />
                    <p className='text-base' style={{'fontFamily': 'Calibri'}}>{allocation}%</p>
                </div>
            </td>
            <td>
                <div className='flex flex-col items-start p-2'  style={{'fontFamily': 'Calibri'}}>
                    <p className='text-gray-700'>{formattedBalance} {symbol}</p>
                    <p className='text-gray-400'>≈ ${formattedFiat}</p>
                </div>
            </td>
            <td>
                {<div className={`${showButtons ? 'opacity-100' : 'opacity-0'} flex items-center`}>
                    <TradeButton onClick={() => {window.location.href = `/trade-crypto?cryptoIndex=${index}`}}/>
                </div>}
            </td>
        </tr>
    );
}