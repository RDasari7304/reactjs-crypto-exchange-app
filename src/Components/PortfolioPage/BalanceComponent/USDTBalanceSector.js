import USDT from '../../../Images/CryptoLogos/USDT.png';

export default function USDTBalanceSector({USDTBalance}){
    const formattedBalance = parseFloat(USDTBalance).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        <div className= 'balance-sector-card h-28 flex-1 m-3 p-4 flex justify-center'>
            <div className="flex flex-col mr-auto">
                <span className= 'mt-1' style= {{'letterSpacing': '.1rem', 'fontFamily': 'Calibri', 'fontSize': '20px'}}> USDT  </span>
                <span className= 'mt-1' style= {{'fontFamily': 'Arial, sans-serif', 'fontSize': '32px'}}>${formattedBalance}</span>
            </div>
            
            <div className="flex justify-center items-center cursor-pointer">
                <img src={USDT} alt="React Image" className='max-w-10 max-h-10 mr-8'/>
            </div>
        </div>
    );
}