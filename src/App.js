import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'

function App() {
  const [route, setroute] = useState('signup')
  const [myName, setmyName] = useState('Anonymous')

  const routing = (key) => {
    switch (key) {
      case 'home':
        return <Home myName={myName} setroute={setroute}/>
      case 'signup':
        return <Signup setmyName={setmyName} setroute={setroute}/>
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
