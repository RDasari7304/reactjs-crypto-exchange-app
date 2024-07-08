import { formatDate } from '../../../TestData/services';
import USDT from '../../../Images/CryptoLogos/USDT.png';

export default function PreviewOrder({orderValue, orderType, crypto, height, width, onConfirm, onBack}){
    const isDeposit = orderType == 'Deposit';
    const strippedOrderValue = orderValue.replace(/[^0-9.]/g, "");
    const payment = [isDeposit ? 'USDT' : crypto.abr.toUpperCase(), orderValue];
    const reward = isDeposit ? [crypto.abr.toUpperCase(), strippedOrderValue / crypto.price] : ['USDT', crypto.price * strippedOrderValue];

    const [month, day, year] = formatDate(new Date());
    const purchaseDate = `${month} ${day} ${year}`;

    return (
        <div className="flex flex-col p-4" style={{'height': height, 'width': width}}>
            <div className="flex items-center pb-2 border-b">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke={'currentColor'}
                onClick={() => onBack()} 
                className={`size-8 mr-2 p-1 cursor-pointer`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p style={{'fontFamily': "Calibri"}} className="text-2xl text-slate-700"> Preview Order </p>
            </div> 
            <div className="flex flex-col items-center justify-center h-full space-y-6" style={{'fontFamily': 'Calibri'}}>
                <p className='text-slate-700'> Are you sure you would like to confirm this purchase? </p>
                <div className='flex items-center space-x-6'>
                    <div className='flex flex-col items-center text-slate-700 space-y-1'>
                        <img src={isDeposit ? USDT : crypto.imgSrc} className='w-8 h-8'/>
                        <p> {payment[1]} {payment[0]} </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                    <div className='flex flex-col items-center text-slate-700 space-y-1'>
                        <img src={isDeposit ? crypto.imgSrc : USDT} className='w-8 h-8'/>
                        <p> {parseFloat(reward[1]).toLocaleString('en')} {reward[0]} </p>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <p>{isDeposit ? 'Purchase' : 'Sell'} price: <span className="font-semibold text-slate-700">${parseFloat(crypto.price).toLocaleString('en')}</span></p>
                    <p>{isDeposit ? 'Purchase' : 'Sell'} date: <span className="font-semibold text-slate-700">{purchaseDate}</span></p>
                </div>
            </div>
            <button onClick= {() => onConfirm()} className='w-full p-2 bg-yellow-500 rounded-sm' style={{'fontFamily': 'Calibri'}}>
                Place Order
            </button>
        </div>
    );
}