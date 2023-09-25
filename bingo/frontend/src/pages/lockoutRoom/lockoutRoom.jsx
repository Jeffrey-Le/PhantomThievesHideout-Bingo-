import { useEffect, useState } from "react";

import LobbyDeatils from './components/lobbyDetails'
import TeamDetails from "./components/teamDetails";
import StartButton from "./components/startButton";

import { useInfoContext } from "../../hooks/context";

function LockoutRoom() {
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;
    
    useEffect(() => {
        console.log(socket)
        console.log(user);
        console.log(room);
    }, []);

    return (
        <>
            <LobbyDeatils/>
            <TeamDetails/>
            <StartButton/>
        </>
    )
}

export default LockoutRoom;