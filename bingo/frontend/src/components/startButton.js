import { useEffect, useState } from "react";
import {Backdrop, Button} from '@mui/material'
import styled from '@emotion/styled';
import {red} from '@mui/material/colors'
import GenerateNewBingoCard from "./generateNewCard";
import LoadExistingCard from "./loadExistingCard";

const ButtonStart = styled(Button, {})({
    maxWidth: '12vh',
    height: '5vh',
});

function StartButton() {
    const [click, setClick] = useState(false)

    useEffect(() => {
        console.log(click);
    }, []);

    const handleClick = () => {
        console.log('CHANGING CLICK: ', click)
        setClick(!click);
        console.log('NEW CLICK: ', click)
      }

    return (
        <>
            <ButtonStart variant="contained" onClick={() => {handleClick()}}> START </ButtonStart>
            {click ? <GenerateNewBingoCard/> : <LoadExistingCard/>}
        </>
    )
}

export default StartButton;