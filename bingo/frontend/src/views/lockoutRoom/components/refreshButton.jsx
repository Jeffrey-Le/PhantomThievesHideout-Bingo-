import { useEffect, useState } from "react";

import styled from '@emotion/styled';

import BaseButton from "../../../shared/styles/buttonBase";
import socket from "services/socket";

function RefreshButton({click, setClick, id}) {

    const ButtonRefresh = styled(BaseButton, {})({
        maxWidth: '12vh',
        height: '5vh',
    });

    const handleClick = () => {
        var tempClick = click;

        tempClick = false;
        
        setClick(tempClick);

        setTimeout(() => {
            tempClick = true;

            setClick(tempClick);
            socket.emit('signalBoard', id)
        }, 1000)
        
    }


    return (
        <>
            <ButtonRefresh variant="contained" onClick={() => {handleClick()}}> New Card </ButtonRefresh>
        </>
    )
}

export default RefreshButton;