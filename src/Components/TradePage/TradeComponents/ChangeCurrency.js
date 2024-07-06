import USDT from '../../../Images/CryptoLogos/USDT.png';

export default function ChangeCurrency({balance, value, exchangeType, setInitialIndex, setShowTrade, crypto}) {
    const fiatExchange = exchangeType === 'USDTtoCrypto';
    const cryptoSymbol = crypto.abr.toUpperCase();
    const cryptoName = crypto.name;
    const cryptoPrice = crypto.price;

    const formattedValue = Number(value.replace(/,/g, ""));
    const displayValue = fiatExchange 
        ? (formattedValue / cryptoPrice).toFixed(8) 
        : (formattedValue * cryptoPrice);

    const availableBalance = Number(balance).toLocaleString('en');

    const handleClick = () => {
        setInitialIndex(fiatExchange ? 0 : 1);
        setShowTrade(false);
    };

    return (
        <div className="border-t mt-5 pt-7 flex items-center w-full cursor-pointer" onClick={handleClick}>
            <img src={fiatExchange ? USDT : crypto.imgSrc} alt="Fiat Image" className="absolute max-w-8 max-h-8 border rounded-2xl p-1 mr-4" />
            <img src={fiatExchange ? crypto.imgSrc : USDT} alt="Crypto Image" className="z-10 ml-4 max-w-8 max-h-8 border rounded-2xl p-1 mr-4" />
            <div className="flex space-x-2 items-baseline">
                <p className="text-lg">{fiatExchange ? cryptoSymbol : 'USDT'}</p>
                <p className="text-lg text-slate-300">{fiatExchange ? cryptoName : 'Tether'}</p>
                <p className="text-lg text-slate-300" style={{ fontFamily: 'Calibri' }}>
                    ≈ {displayValue.toLocaleString('en')}
                </p>
            </div>
            <p className='ml-auto mr-4 text-sm text-gray-500' style={{ fontFamily: 'Calibri' }}>
                Available {fiatExchange ? 'USDT: $' : `${cryptoSymbol}: `}{availableBalance}
            </p>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke={'grey'} 
                className="size-8 p-1 cursor-pointer"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    );
}