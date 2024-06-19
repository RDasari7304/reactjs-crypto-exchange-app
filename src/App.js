import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';

function App() { 

  return (
    <div className="App bg-slate-100 min-w-full min-h-screen">
      <Navbar />
      <Profile />
    </div>
  );
}

export default App;
