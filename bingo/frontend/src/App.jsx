import './App.css';

import { useEffect, useState } from 'react'

import Home from './pages/home/components/home';

import { User, HostUser } from './shared/user';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LockoutHome from './pages/lockout/components/lockoutHome';
import socket from './service/socket';
import LockoutRoom from './pages/lockout/components/lockoutRoom';


function Hi() {
  let normUser = new User();
  let hostUser = new HostUser();

  console.log(normUser);
  console.log(hostUser);

  return (
    <div>Hello Mom</div>
  )
}


function App() {
  const [number, setNumber] = useState(0);

  const add = () => {
    setNumber(number + 1);
  }

  useEffect(() => {
    if (socket)
      console.log(socket)
    else
      console.log('Eror No SOckets')
  }, [])

  return (
    <>
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home socket={socket}/>}/>
          <Route exact path='leaderboard'/>
          <Route exact path='lockout' element={<LockoutHome socket={socket}/>}/>
          <Route exact path='lockout/room' element={<LockoutRoom socket={socket}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
    </>
  );
}

export default App;
