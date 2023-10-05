import { useEffect, useState } from "react";

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

    const [click, setClick] = useState(true);
    
    useEffect(() => {
        socket.connect()
        
        console.log(socket)
        console.log(user);
        console.log(room);
    }, []);

    return (
        <>
            <LobbyDeatils/>
            <TeamDetails/>
            <RefreshButton setClick={setClick}/>
            {click ? <LoadExistingCard/> : <div> LOADING </div>}
        </>
    )
}

export default LockoutRoom;