import './App.css';

import { useEffect, useState } from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

import socket from './service/socket';

import { User, HostUser } from './shared/user';

import { InfoContext } from './hooks/context';

import Home from './pages/home/components/home';
import LockoutHome from './pages/lockoutHome/lockoutHome';
import LockoutRoom from './pages/lockoutRoom/lockoutRoom';



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
  const [user, setUser] = useState(new User());

  const [room, setRoom] = useState(0);
// user={user} room={room} setUser={setUser} setRoom={setRoom} socket={socket}
  return (
    <>
    <div className="App">
      <InfoContext.Provider value={{user: [user, setUser], room: [room, setRoom], socket: socket}}>
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home socket={socket}/>}/>
          <Route exact path='leaderboard'/>
          <Route exact path='lockout' element={<LockoutHome />}/>
          <Route exact path='lockout/room' element={<LockoutRoom />}/>
        </Routes>
        </BrowserRouter>
      </InfoContext.Provider>
    </div>
    </>
  );
}

export default App;
