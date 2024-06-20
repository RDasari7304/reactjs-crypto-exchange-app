import apecoin from '../Images/apecoin.png';
import rndr from '../Images/rndr.png';
import filecoin from '../Images/filecoin.png';
import bitcoin from '../Images/bitcoin.png';

export default function BalanceSector(){
    return (
        <div className= 'balance-sector-card h-28 flex-1 m-3 p-4 flex justify-center'>
            <div className="flex flex-col mr-auto">
                <span className= 'mt-2' style= {{'letter-spacing': '.1rem', 'font-family': 'Verdana, Geneva, Tahoma, sans-serif'}}> Crypto </span>
                <span className= 'mt-1' style= {{'font-family': 'Arial, sans-serif', 'font-size': '32px'}}>$13,574.95</span>
            </div>
            
            <div className="flex justify-center items-center">
                <img src={apecoin} alt="React Image" className='max-w-10 max-h-10 mr-1'/>
                <img src={rndr} alt="React Image" className='max-w-11 max-h-11 mr-1'/>
                <img src={filecoin} alt="React Image" className='max-w-10 max-h-10 mr-1'/>
                <img src={bitcoin} alt="React Image" className='max-w-10 max-h-10 mr-8'/>
                <button className='px-2 mr-2 bg-slate-200' style={{'border-radius': '35%'}}> more </button>
                <div className='flex cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} opacity={0.75} stroke="grey" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                </div>
            </div>
        </div>
    );
}