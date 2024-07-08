export default function CryptoBalanceSector({accountVal, userData}){
    const formattedValue = parseFloat(accountVal - userData.usdt_balance).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const sortedAssets = Object.entries(userData.assets).sort(([, a], [, b]) => b.amount - a.amount);
    const topAssets = sortedAssets.slice(0, 2).map((asset) => userData.allocated_cryptos[asset[0]].imgSrc);

    return (
        <div className= 'balance-sector-card h-28 flex-1 m-3 p-4 flex justify-center'>
            <div className="flex flex-col mr-auto">
                <span className= 'mt-1' style= {{'letterSpacing': '.1rem', 'fontFamily': 'Calibri', 'fontSize': '20px'}}> Crypto </span>
                <span className= 'mt-1' style= {{'fontFamily': 'Arial, sans-serif', 'fontSize': '32px'}}>${formattedValue}</span>
            </div>
            
            <div className="flex justify-center items-center cursor-pointer">
                {topAssets.map((imgSrc) => <img src={imgSrc} alt="React Image" className='max-w-10 max-h-10 mr-8'/>)}
                
            </div>
        </div>
    );
}