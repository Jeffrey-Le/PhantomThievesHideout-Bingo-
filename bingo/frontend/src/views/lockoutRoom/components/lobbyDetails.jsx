import React, { useEffect, useRef, useState } from 'react'
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

function LobbyDeatils({members, setMembers})
{
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;


    return (
        <>
        <LobbyContainer>
            <LobbyBox>
                <List>
                    <ListItemText primaryTypographyProps={{style: detailsTitle}}>Lobby Details</ListItemText>
                    <ListItemText> {room} </ListItemText>
                    {members.length > 0 && members.map((user) => {
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
