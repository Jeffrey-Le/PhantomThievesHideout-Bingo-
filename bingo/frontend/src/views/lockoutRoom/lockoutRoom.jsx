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

    const [clickOne, setClickOne] = useState(true);
    const [clickTwo, setClickTwo] = useState(true);

     // Refs
     const effectRan = useRef(false);

     const loadCode = () => {
         socket.emit('userConnect', user, user.sid, room);
         //socket.emit('loadBoard');
 
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

    useEffect(() => {
        console.log('clickone changed')
    }, [clickOne])

    useEffect(() => {
        console.log('clickTwo changed')
    }, [clickTwo])

    return (
        <>
            <LobbyDeatils members={members} setMembers={setMembers}/>
            <TeamDetails members={members} setMembers={setMembers}/>
            <RefreshButton click={clickOne} setClick={setClickOne} id={1}/>
            { clickOne ? <LoadExistingCard id={1}/> : <div> Loading Board </div>}
            <RefreshButton click={clickTwo} setClick={setClickTwo} id={2}/>
            { clickTwo ? <LoadExistingCard id={2}/> : <div> Loading Board </div>}
        </>
    )
}

/*
                {
                click.map((board) => {
                    return (
                        <>
                        <div key={board.id}>
                            <RefreshButton click={click} setClick={setClick} id={board.id}/>
                            {board.value ? <LoadExistingCard clicked={board} id={board.id} /> : <div> Loading Board</div>}
                        </div>
                        </>
                    )
                })
            }
*/

/*
     <RefreshButton click={click} setClick={setClick} id={1}/>
            { click[0].value ? <LoadExistingCard clicked={click[0]} id={1}/> : <div> Loading Board </div>}
            <RefreshButton click={click} setClick={setClick} id={2}/>
            { click[1].value ? <LoadExistingCard clicked={click[1]} id={2}/> : <div> Loading Board </div>}
*/

export default LockoutRoom;