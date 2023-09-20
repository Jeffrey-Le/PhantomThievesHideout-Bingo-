import { useState } from "react";

import LobbyDeatils from './components/lobbyDetails'
import TeamDetails from "./components/teamDetails";
import StartButton from "./components/startButton";

function LockoutRoom() {
    

    return (
        <>
            <LobbyDeatils/>
            <TeamDetails/>
            <StartButton/>
        </>
    )
}

export default LockoutRoom;