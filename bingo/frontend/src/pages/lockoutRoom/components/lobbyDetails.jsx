import React, { useEffect, useState } from 'react'
import {Box, List, ListItemText} from '@mui/material'
import {purple} from '@mui/material/colors'
import {LobbyBox, LobbyContainer } from './lobbyStyles'

import { useInfoContext } from '../../../hooks/context'

// Lobby Details Title
const purples = purple[500];

const detailsTitle = {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '20px',
    color: purples
};

function LobbyDeatils()
{
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    const [users, setUsers] = useState([]);

    const loadCode = () => {
        socket.connect()

        socket.on('userConnected', (data) => {
            console.log('CONNECTING')
            console.log(socket.id)
            
            setUsers(data);
        })


        setTimeout(() => {
            socket.disconnect();
        }, 5000);
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
                    <ListItemText> {room} </ListItemText>
                    {users.map((user) => {
                        return (
                        <ListItemText> {user.name} </ListItemText>
                        )
                    })}
                </List>
            </LobbyBox>
        </LobbyContainer>
        </>
    )
}

export default LobbyDeatils;