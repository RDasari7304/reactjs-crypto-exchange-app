import ToggleEye from './ToggleEye.js';
import Graph from './Graph.js';
import { useState } from 'react';
import BalanceSector from './BalanceSector.js';

export default function Balance({data}){
    const [showBalance, setShowBalance] = useState(true);

    return(
        <div className="bg-white w-full max-w-6xl p-6 ml-auto mr-auto portfolio-cards">
            <div>
                <div className='flex p-4'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-extralight balance-title'> Balance </span>
                        <div className='mt-4 flex justify-center items-center'>
                            
                            <span className={`${showBalance? 'show-balance-dollar mt-1' : 'hide-balance-dollar'}`}>$</span>
                            {showBalance ? 
                                <span className='show-balance mr-5'>{Number(data[data.length - 1].value.toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2, minimumFractionDigits: 2})}</span>
                                :
                                <span className='hide-balance ml-1 mr-5'>........</span>
                            }
                                
                            <ToggleEye onClick={() => setShowBalance(!showBalance)} toggle= {showBalance}/>
                            
                            
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <button className='px-4 py-1 font-sans button-border mr-1'>Deposit</button>
                        <button className='px-4 py-1 font-sans button-border border-opacity-30 ml-1'>Withdraw</button>
                    </div>
                </div>
            </div>
            <Graph data={data}/>
            <div className='flex justify-center items-center w-full'>
                <BalanceSector />
                <BalanceSector />
            </div>
        </div>
    );
}