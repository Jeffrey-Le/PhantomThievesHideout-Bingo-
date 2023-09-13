import React from 'react'
import {Box, Stack, List, ListItemText} from '@mui/material'
import {styled} from '@mui/system'
import { LobbyBox, LobbyContainer } from '../styles/lobbyStyles'

// Team Boxes
const TeamBox = styled(Box, {})({
    padding: 0,
    margin: 0,
    width: '100%',
    height: '12.5vh',
});

function TeamDetails()  {
    const teamColors = ['rgba(255, 0, 0, 0.7)', 'rgba(0, 0, 128, 0.7)', 'rgba(0, 128, 0, 0.7)', 'rgba(255, 255, 0, 0.7)'];

    let teamBoxesArray = [];

    for (let i = 0; i < 4; i++)
    {
        teamBoxesArray[i] = {id: i, teamColor: teamColors[i]};
    }

    const handleClick = (color) => {
        console.log("Team Color Clicked: ", color);
    }

    return (
        <LobbyContainer>
            <LobbyBox>
                <Stack spacing={0}>
                    {teamBoxesArray.map((box) => {
                        return (<TeamBox bgcolor={box.teamColor} key={box.id} onClick={() => {handleClick(box.teamColor)}}>
                            <List>
                                <ListItemText>Yes</ListItemText>
                                <ListItemText>No</ListItemText>
                                <ListItemText>HOMO</ListItemText>
                                <ListItemText>HOMO</ListItemText>
                            </List>
                        </TeamBox>)
                    })}
                </Stack>
            </LobbyBox>
        </LobbyContainer>
    )
}

export default TeamDetails;