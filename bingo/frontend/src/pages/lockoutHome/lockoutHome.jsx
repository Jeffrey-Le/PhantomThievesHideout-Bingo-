import { useContext, useEffect, useState } from "react";

import BaseButton from "../../shared/styles/buttonBase";
import { Container, FormControl, FormLabel, Paper, TextField, Typography } from "@mui/material";
import { BaseContainer, FlexContainer } from "../../shared/styles/containerStyles";
import { Routes, Route, useNavigate } from "react-router";

import { HostUser, User} from "../../shared/user";
import styled from "@emotion/styled";

import CenteredTitle from "./components/centeredTitle";
import JoinNavigator from "./components/joinNavigator";
import { useInfoContext } from "../../hooks/context";


function LockoutHome() {
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;
/*
    useEffect(() => {
        socket.disconnect()
    }, [])

    const [user, setUser] = useState(new User());

    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (event) => {
        console.log('Button Works');
        event.preventDefault();

        setError(false);

        if (roomCode === '') {
            setError(true);
        }

        socket.connect();

        socket.on('connect', () => {
            console.log('Is Connected OnSubmit');
            socket.emit('joinRoom', roomCode);
        })

        socket.on('message', (data) => {
            console.log(data.name, data.message);
        })

        socket.on('joinRoom', (recv) => {
            const tempUser = user;
            tempUser.name = recv.name
            tempUser.sid = recv.sid
 
            setUser(tempUser);
        });

        /*
        setTimeout(() => {
            socket.disconnect();
        }, 2000);
        
        
    }

    const handleDC = () => {
        console.log('DC');
        socket.disconnect();

        socket.on('disconnect', () => {
            console.log('Disconencting from Room')
        })
    }

    const createRoom = () => {
       socket.connect();
        
        socket.on('connect', () => {
            console.log('Connection CreateRoom');
            socket.emit('createRoom');
        });

        socket.on('createRoom', async (recv) => {
            const host = new HostUser(recv.name, recv.sid);
            setRoomCode(recv.code);
            setUser(host);
        });
        
        console.log('RoomCode: ', roomCode)
    }

    useEffect(() => {
        console.log(user);
        socket.emit('redirect');
    }, [user])

    socket.on('redirect', (recv) => {
        console.log('User has joined')
        console.log(recv)

        socket.emit('userConnected', user, roomCode)
        
        setTimeout(() => {
            console.log('Navigating to Room')
            navigate(`/lockout/room`, {replace: true})
        }, 1000)
        
    })

    socket.on('error', () => {
        console.log('INVALID ROOM')

        socket.disconnect()
    })


//<Route value={roomCode} path={`lockout/room/${roomCode}`} element={<LockoutRoom socket={socket}/>}/>
    return (
        <>

        <FlexContainer sx={{flexDirection: 'column'}}>

                <TitleContainer> 
                    <Title> Lockout </Title>
                </TitleContainer>
                
                
                <FlexContainer sx={{ marginTop: '40vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Paper square='true' variant="outlined" sx={{display: 'flex', alignItems: 'center', bgcolor: 'yellow', width: '50vh', height: '50vh', flexDirection: 'column', justifyContent: 'center'}}>
                        <BaseButton sx={{marginBottom: '2vh'}} name='createRoom' onClick={createRoom} variant="contained"> Create Room </BaseButton>

                        <FormControl>
                            <FormLabel> Join Room </FormLabel>
                                <form autoComplete="off" onSubmit={onSubmit}>
                                    <TextField label='Room Code' sx={{display: 'block'}} placeholder="Room Code" onChange={room => {setRoomCode(room.target.value)}} value={roomCode} error={error}/>
                                    <BaseButton type='submit' name='joinRoom' variant="contained"> Join </BaseButton>
                                </form>
                        </FormControl>
                    </Paper>
                </FlexContainer>
                


                <BaseButton onClick={handleDC} variant="contained" sx={{marginBottom: '2vh'}}> DC </BaseButton>
        </FlexContainer>

        </>
    )
    */

    useEffect(() => {
        console.log(user);
    }, [])

   return (
    <>
        <FlexContainer sx={{flexDirection: 'column'}}>

            <CenteredTitle title='Lockout' />

            <JoinNavigator user={user} room={room} setUser={setUser} setRoom={setRoom} socket={socket}/>

        </FlexContainer>
    </>
   )
}

export default LockoutHome;