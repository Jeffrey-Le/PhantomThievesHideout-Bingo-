import { useState } from "react";
import {Backdrop, Button} from '@mui/material'
import styled from '@emotion/styled';
import {red} from '@mui/material/colors'

const seed = [9200, 1400, 1600, 7600, 8900];

const ButtonStart = styled(Button, {})({
    maxWidth: '12vh',
    height: '5vh',
});

function getNewChallenges() {
    
}

function generateNewBingoCard() {
    console.log('Hello');

    const randomIndex = Math.floor(Math.random() * seed.length);

    const selectedSeed = seed[randomIndex];

    console.log(`Selected Seed: ${selectedSeed}`)
}

function StartButton() {
    return (
        <ButtonStart variant="contained" onClick={() => {generateNewBingoCard()}}> START </ButtonStart>
    )
}

export default StartButton;