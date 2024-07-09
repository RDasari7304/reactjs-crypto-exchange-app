import ToggleEye from './ToggleEye.js';
import BalanceGraph from './BalanceGraph.js';
import { useState } from 'react';
import USDTBalanceSector from './USDTBalanceSector.js';
import CryptoBalanceSector from './CryptoBalanceSector.js';

export default function Balance({accountVal, data, userData}){
    const [showBalance, setShowBalance] = useState(true);

    return(
        <div className="bg-white max-w-7xl w-full p-6 ml-auto mr-auto portfolio-cards">
            <div>
                <div className='flex p-4'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-extralight balance-title'> Balance </span>
                        <div className='mt-4 flex justify-center items-center'>
                            
                            <span className={`${showBalance? 'show-balance-dollar mt-1' : 'hide-balance-dollar'}`}>$ </span>
                            {showBalance ? 
                                <span className='show-balance mr-5'> {Number(accountVal).toLocaleString('en')}</span>
                                :
                                <span className='hide-balance ml-1 mr-5'>........</span>
                            }
                                
                            <ToggleEye onClick={() => setShowBalance(!showBalance)} toggle= {showBalance}/>
                            
                            
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <button className='px-4 py-1 font-sans button-border mr-1 hover:ring-yellow-500 hover:border-yellow-500' style= {{'fontFamily': 'Calibri', 'fontSize': '16px'}}>Deposit</button>
                    </div>
                </div>
            </div>
            <BalanceGraph data={data}/>
            <div className='flex justify-center items-center w-full mt-5'>
                <CryptoBalanceSector accountVal={accountVal} userData={userData}/>
                <USDTBalanceSector USDTBalance={userData.usdt_balance}/>
            </div>
        </div>
    );
}