import './App.css';
import ToggleEye from './Components/ToggleEye';
import Graph from './Components/Graph';
import { subDays } from 'date-fns';

function App() {
  const data = []
  
  for(let i = 30; i >= 0; i--){
    data.push({
      date: subDays(new Date(), i).toISOString().substr(0, 10),
      value: (13000 + Math.random() * 5000)
    });
  }

  console.log(data);

  return (
    <div className="App bg-slate-100 min-w-full min-h-screen p-10">
      <div className="bg-white w-full max-w-6xl p-6 ml-auto mr-auto balance-card">
        <div>
          <div className='flex p-4'>
            <div className='flex flex-col'>
              <span className='text-xl font-extralight balance-title'> Balance </span>
              <div className='mt-4 flex justify-center items-center'>

                <span className='font-normal mr-4 balance-amount'> 
                    ${Number(data[data.length - 1].value.toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2, minimumFractionDigits: 2})} 
                </span>
                <ToggleEye />

              </div>
            </div>
            <div className='ml-auto'>
              <button className='px-4 py-1 font-sans button-border mr-1'>Deposit</button>
              <button className='px-4 py-1 font-sans button-border border-opacity-30 ml-1'>Withdraw</button>
            </div>
          </div>
        </div>
        <Graph data={data}/>
      </div>
    </div>
  );
}

export default App;
