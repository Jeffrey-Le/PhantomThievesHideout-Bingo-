import { useState } from "react";

import LobbyDeatils from './lobbyDetails'
import TeamDetails from "./teamDetails";
import StartButton from "./startButton";

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