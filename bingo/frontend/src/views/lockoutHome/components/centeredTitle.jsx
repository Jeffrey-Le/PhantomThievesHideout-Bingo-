import { useState } from "react";

import { Container, FormControl, FormLabel, Paper, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { BaseContainer, FlexContainer } from "../../../shared/styles/containerStyles";

function CenteredTitle({title}) {
       // STYLES //
    const TitleContainer = styled(BaseContainer, {})({
        backgroundColor: 'blue',
        width: '80vh',
        height: '11vh',
        display: 'flex',
        'justify-content': 'center',
        'clip-path': 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)'
    })

    // clip-path: polygon(topLeft to Right, topLeft Down, topRight Left, TopRight Down, bottomRight Left, bottomRight Up, bottomLeft Right, bottomLeft Up)

    const Title = styled(Typography, {})({
        textAlign: 'center',
        display: 'block',
        color: 'black',
        justifySelf: 'start',
        alignSelf: 'normal',
        fontSize: '6vh',
        fontFamily: 'Rodfellows-wacky',
        letterSpacing: '3vh',
    })

    return (
        <>
            <TitleContainer>
                <Title> {title} </Title>
            </TitleContainer>
        </>
    )
}

export default CenteredTitle;