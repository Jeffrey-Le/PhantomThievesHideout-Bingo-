import 'App.css';

import { useEffect, useState, useRef } from 'react'

import {BrowserRouter, HashRouter, Route, Routes, useBeforeUnload} from 'react-router-dom'

import {useH} from 'react-router'


import socket from 'services/socket';

import { User, HostUser } from 'shared/user';

import { InfoContext } from 'hooks/context';

import {Home, LockoutHome, LockoutRoom} from "views/index"

import { ThemeProvider, useTheme } from '@emotion/react';
import { Container, CssBaseline, createTheme } from '@mui/material';
import theme from 'shared/styles/themes';
import useFetch from 'hooks/useFetch';


function App() {
  const [user, setUser] = useState(new User());

  const [room, setRoom] = useState(0);

  const themeToUse = createTheme(theme);

  // Refs
  const effectRan = useRef(false);
// user={user} room={room} setUser={setUser} setRoom={setRoom} socket={socket}

  useEffect(() => {
    if (effectRan.useEffect === true)
      socket.connect();

    return (() => {
      effectRan.useEffect = true;
    })
  }, [])

  socket.on('connected', () => {
    const tempUser = user;
    tempUser.sid = socket.id;
    setUser(tempUser);
  })

  /*
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();

    redirect('/', {replace: true})

    return ev.returnValue = 'Are you sure you want to close?';
  })
*/









// TODO WIP => WAVE EFFECT BACKGROUND
/*
const waveEffect = () => {
  var i=0;
  const app = document.getElementsByClassName("App")

  
  setInterval(()=>{

      
      document.app.style.background="linear-gradient(135deg,orange 0%, blue "+i+"%, darkorchid 100%)";
      document.app.style.backgroundRepeat="no-repeat";
      document.app.style.backgroundSize="360px 570px";
      
      i++;
      
      
      if(i==100){
          
          i=0;      
                
      }
    
      
  },50);

}
*/


  return (
    <>
    <ThemeProvider theme={themeToUse}>
    <div style={{'background': `linear-gradient(to right, ${theme.palette.primary.darkRed}, ${theme.palette.primary.main})`}} className="App">
    
        <CssBaseline/>
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
    </ThemeProvider>
    </>
  );
}

export default App;

