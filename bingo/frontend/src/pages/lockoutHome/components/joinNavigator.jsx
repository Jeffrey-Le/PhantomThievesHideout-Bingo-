import { useEffect, useState } from "react";

import { Paper, TextField, iconClasses } from "@mui/material";


import { FlexContainer } from "../../../shared/styles/containerStyles";
import BaseButton from "../../../shared/styles/buttonBase";

import { useNavigate } from "react-router";
import { HostUser } from "../../../shared/user";

function JoinNavigator({user, room, setUser, setRoom, socket}) {
    const [create, setCreate] = useState(false);

    useEffect(() => {
        socket.connect()
    }, [])

    const navigate = useNavigate();

    const navigateRoom = () => {
        console.log(user)

        console.log('Navigating to Room')
        console.log(room)
    
        console.log(user);
    
        console.log('Joining Room');

        setTimeout(() => {
            navigate('/lockout/room', {replace: true})
        }, 1000)
        
    }

    const joinRoom = () => {
        console.log('Joining Room')
        socket.emit('joinRoom', user, room);
    }

    const createRoom = () => {
        console.log('Create has Changed');
        console.log('Creating Room');

        const host = new HostUser();
        host.name = user.name;
        host.sid = user.sid;

        setUser(host);

        socket.emit('createRoom', host)
    }

    socket.on('redirect', (user, code) => {
        setRoom(code);
        setUser(user);
        navigateRoom();
    })

    socket.on('error', () => {
        console.log('There is no such room that exists yet.')
    })

    // sx Stlyes
    const navigatorContainer = ({
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '40vh'
    });

    const navigatorPaper = ({
        bgcolor: 'yellow',
        minWidth: '50vh',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    });

    const buttonContainer = ({
        justifyContent: 'center',
        gap: '8vh',
        marginTop: '3vh'
    })

    return (
        <>
            <FlexContainer sx={navigatorContainer}>
                <Paper square='true' variant="outlined" sx={navigatorPaper}>
                    <TextField label='Room Code' placeholder='Room Code' value={room} onChange={room => {setRoom(room.target.value)}}/>
                    <FlexContainer sx={buttonContainer}>
                        <BaseButton variant="contained" onClick={() => {createRoom()}}>Create</BaseButton>
                        <BaseButton variant="contained" onClick={() => {joinRoom()}}>Join</BaseButton>
                    </FlexContainer>
                    
                </Paper>
            </FlexContainer>

            
        </>
    )
}

export default JoinNavigator;