import './App.css';

import { useEffect, useState, useRef } from 'react'

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

  // Refs
  const effectRan = useRef(false);
// user={user} room={room} setUser={setUser} setRoom={setRoom} socket={socket}

  useEffect(() => {
    if (effectRan.useEffect === true)
      socket.connect();
    /*
    setTimeout(() => {
      socket.disconnect();
    }, 1000);
    */

    return (() => {
      effectRan.useEffect = true;
    })
  }, [])

  socket.on('connected', () => {
    const tempUser = user;
    tempUser.sid = socket.id;
    setUser(tempUser);
    console.log(tempUser);
    
  })

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();

    socket.emit('forceDisconnect', user['sid'], room);

    return ev.returnValue = 'Are you sure you want to close?';
  })

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
