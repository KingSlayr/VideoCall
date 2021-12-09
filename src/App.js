import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'

function App() {
  const [route, setroute] = useState('home')

  const routing = (key) => {
    switch (key) {
      case 'home':
        return <Home/>
      case 'signup':
        return <Signup setroute={setroute}/>
      default:
        return <h2 style={{textAlign:'center'}}>Error 404 : Page Not Found</h2>
    }
  }

  return (
    <div className="App">
      {routing(route)}
    </div>
  );
}

export default App;
