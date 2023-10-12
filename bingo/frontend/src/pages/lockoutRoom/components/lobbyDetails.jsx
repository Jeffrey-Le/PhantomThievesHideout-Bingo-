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

function LobbyDeatils()
{
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    const [members, setMembers] = useState([]);

    // Refs
    const effectRan = useRef(false);

    const loadCode = () => {
        socket.emit('userConnect', user, user.sid, room);
        socket.emit('signalBoard');

        socket.on('userConnected', (data) => {
            console.log('CONNECTING')
            console.log(socket.id)

            if (!data.find((item) => JSON.stringify(item) === JSON.stringify(user)))
            {
                data.push(user);
                setMembers(data);
                socket.emit('updateExistingUsers', data, room)
            }
            else
                console.log('equals');



            console.log(data);
        })

        /*
        setTimeout(() => {
            socket.disconnect();
        }, 5000);
        */
    }

    useEffect(() => {
        //socket.disconnect()
        if (effectRan.useEffect === true)
            loadCode();

        return (() => {
            effectRan.useEffect = true;
        })
    }, [])

    socket.on('userDisconnect', (users) => {
        console.log('userDisconencted')
        setMembers(users);
    })

    socket.on('updateMembers', (users) => {
        setMembers(users);
    })

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