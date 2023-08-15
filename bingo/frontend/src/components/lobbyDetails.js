import React from 'react'
import {Box, List, ListItemText} from '@mui/material'
import {purple} from '@mui/material/colors'
import {LobbyBox, LobbyContainer } from '../styles/lobbyStyles'

// Lobby Details Title
const purples = purple[500];

const detailsTitle = {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '20px',
    color: purples
};

function LobbyDeatils()
{
    return (
        <>
        <LobbyContainer>
            <LobbyBox>
                <List>
                    <ListItemText primaryTypographyProps={{style: detailsTitle}}>Lobby Details</ListItemText>
                    <ListItemText>Name 1</ListItemText>
                    <ListItemText>Name 2</ListItemText>
                    <ListItemText>Name 3</ListItemText>
                    <ListItemText>Name 4</ListItemText>
                    <ListItemText>Name 5</ListItemText>
                </List>
            </LobbyBox>
        </LobbyContainer>
        </>
    )
}

export default LobbyDeatils;