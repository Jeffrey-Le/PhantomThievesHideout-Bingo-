import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import {red} from '@mui/material/colors'
import GenerateNewBingoCard from "./generateNewCard";
import LoadExistingCard from "./loadExistingCard";
import BaseButton from "../../../shared/styles/buttonBase";

const ButtonStart = styled(BaseButton, {})({
    maxWidth: '12vh',
    height: '5vh',
});

function StartButton() {
    const [click, setClick] = useState(false)

    useEffect(() => {
        console.log(click);
    }, []);

    const handleClick = () => {
        console.log('Click: ', click);
        setClick(true);
      }

    return (
        <>
            <ButtonStart variant="contained" onClick={() => {handleClick()}}> START </ButtonStart>
            {click ? <GenerateNewBingoCard/> : <LoadExistingCard/>}
        </>
    )
}

export default StartButton;