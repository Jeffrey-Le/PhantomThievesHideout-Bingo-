import React, { useEffect } from 'react'
import {Box, List, ListItemText} from '@mui/material'
import {purple} from '@mui/material/colors'
import {LobbyBox, LobbyContainer } from '../styles/lobbyStyles'

import socket from '../../../service/socket'

// Lobby Details Title
const purples = purple[500];

const detailsTitle = {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '20px',
    color: purples
};

function LobbyDeatils()
{
    const loadCode = () => {
        socket.connect()

        socket.on('connect', () => {
            console.log('CONNECTING')
            console.log(socket.id)
        })

        socket.on('userConnected', (data) => {
            console.log('data: ', data)
            console.log(data.name, data.message)
        })
        console.log('Working')
    }

    useEffect(() => {
        //socket.disconnect()
        loadCode();
    }, [])

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