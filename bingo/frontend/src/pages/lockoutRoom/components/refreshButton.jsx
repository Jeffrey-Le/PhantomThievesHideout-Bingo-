import { useEffect, useState } from "react";

import styled from '@emotion/styled';

import BaseButton from "../../../shared/styles/buttonBase";

function RefreshButton({setClick}) {

    const ButtonRefresh = styled(BaseButton, {})({
        maxWidth: '12vh',
        height: '5vh',
    });

    const handleClick = () => {
        setClick(false);
        setTimeout(() => {
            setClick(true);
        }, 1000)
        
    }

    return (
        <>
            <ButtonRefresh variant="contained" onClick={() => {handleClick()}}> New Card </ButtonRefresh>
        </>
    )
}

export default RefreshButton;