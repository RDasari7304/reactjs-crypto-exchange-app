import './App.css';
import ToggleEye from './Components/ToggleEye';

function App() {
  return (
    <div className="App bg-slate-100 min-w-full min-h-screen pt-10 pb-10">
      <div className="bg-white w-full max-w-5xl p-6 ml-auto mr-auto">
        <div>
          <div className='flex p-4'>
            <div className='flex flex-col'>
              <span className='text-xl font-extralight balance-title'> Balance </span>
              <div className='mt-4 flex justify-center items-center'>
                <span className='font-normal mr-4 balance-amount'> $150,000 </span>
                <ToggleEye />
                
              </div>
            </div>
            <div className='ml-auto'>
              <button className='px-4 py-1 font-sans button-border mr-1'>Deposit</button>
              <button className='px-4 py-1 font-sans button-border border-opacity-30 ml-1'>Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
