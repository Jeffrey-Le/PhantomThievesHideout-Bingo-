import { useState } from "react";

import { Container, FormControl, FormLabel, Paper, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { BaseContainer, FlexContainer } from "../../../shared/styles/containerStyles";

function CenteredTitle({title}) {
       // STYLES //
    const TitleContainer = styled(BaseContainer, {})({
        backgroundColor: 'blue'
    })

    const Title = styled(Typography, {})({
        textAlign: 'center',
        display: 'block',
        color: 'black',
        justifySelf: 'start',
        alignSelf: 'normal',
        fontSize: '5vh'
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