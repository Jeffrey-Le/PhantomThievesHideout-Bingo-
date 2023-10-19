import { useEffect, useState, useRef } from "react";

import LobbyDeatils from './components/lobbyDetails'
import TeamDetails from "./components/teamDetails";
import StartButton from "./components/startButton";

import { useInfoContext } from "../../hooks/context";
import RefreshButton from "./components/refreshButton";
import LoadExistingCard from "./components/loadExistingCard";

function LockoutRoom() {
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    const [members, setMembers] = useState([]);

    const [click, setClick] = useState(true);

     // Refs
     const effectRan = useRef(false);

     const loadCode = () => {
         socket.emit('userConnect', user, user.sid, room);
         socket.emit('signalBoard');
 
         socket.on('userConnected', (data) => {
             console.log('CONNECTING')
             console.log('UserConnected: ', data)
 
             if (!data.find((item) => JSON.stringify(item.sid) === JSON.stringify(user.sid)))
             {
                 data.push(user);
                 setMembers(data);
                 socket.emit('updateExistingUsers', data, room)
             }
             else
                 setMembers(data);
 
 
 
             console.log(data);
         })
 
     }
    
    useEffect(() => {
        socket.connect()
        
        if (effectRan.useEffect === true)
            loadCode();

        return (() => {
            effectRan.useEffect = true;
        })
    }, []);

    socket.on('userDisconnect', (users) => {
        console.log('userDisconencted')
        //setMembers(users);
    })

    // ONLY RUNS IF OTHER PEOPLE CHANGE MEMBERS
    socket.on('updateMembers', (users) => {
        console.log('updateMembers')
        setMembers(users);
    })

    // DISPLAYS SEND MESAGE
    socket.on('message', (data) => {
        const message = data.name + data.message;
        console.log(message);
    })

    return (
        <>
            <LobbyDeatils members={members} setMembers={setMembers}/>
            <TeamDetails members={members} setMembers={setMembers}/>
            <RefreshButton setClick={setClick}/>
            {click ? <LoadExistingCard/> : <div> LOADING </div>}
        </>
    )
}

export default LockoutRoom;