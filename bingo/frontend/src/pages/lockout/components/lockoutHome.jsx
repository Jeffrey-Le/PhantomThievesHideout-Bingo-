import { useContext, useEffect, useState } from "react";

import BaseButton from "../../../shared/styles/buttonBase";
import { Box, Container, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { BaseContainer, FlexContainer } from "../../../shared/styles/containerStyles";
import { Routes, Route, useNavigate } from "react-router";

import LockoutRoom from "./lockoutRoom";


function LockoutHome({socket}) {

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

        socket.on("connect", () => {
            console.log('Is Connected');
        })
    
        setTimeout(() => {
            console.log('Navigating to a Room')
            navigate(`/lockout/room/${roomCode}`)
        }, 1000)
        
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
            console.log('Connection');
            socket.emit('createRoom');
        });

        socket.on('createRoom', (recv) => {
            console.log('Creating ROom', recv.code);
            setRoomCode(recv.code)
            socket.emit('redirect')
        });

        socket.on('redirect', () => {
            setTimeout(() => {
                console.log('Navigating to Room')
                navigate(`/lockout/room/${roomCode}`, {replace: true})
            }, 1000)
        })
        
        console.log('RoomCode: ', roomCode)
        setTimeout(() => {
            socket.disconnect();
        }, 200);
    }


    return (
        <>
        <Routes>
            <Route value={roomCode} path={`lockout/room/${roomCode}`} element={<LockoutRoom socket={socket}/>}/>
        </Routes>
        <FlexContainer sx={{flexDirection: 'column'}}>
                <BaseContainer sx={{bgcolor: 'blue'}}> 
                    <Typography textAlign={'left'} sx={{display: 'block', color: 'black', alignSelf: 'normal', justifySelf: 'start'}}> Lockout </Typography>
                </BaseContainer>
                
                <FlexContainer sx={{ bgcolor: 'red', marginTop: '40vh', alignItems: 'center', justifyContent: 'center'}}>

                    <FormControl>
                        <FormLabel> Join Room </FormLabel>
                            <form autoComplete="off" onSubmit={onSubmit}>
                                <TextField label='Room Code' sx={{display: 'block'}} placeholder="Room Code" onChange={room => {setRoomCode(room.target.value)}} value={roomCode} error={error}/>
                                <BaseButton type='submit' name='joinRoom' variant="contained"> Join </BaseButton>
                            </form>
                    </FormControl>

                </FlexContainer>

                <BaseButton onClick={handleDC} variant="contained" sx={{marginBottom: '2vh'}}> DC </BaseButton>
                <BaseButton type='submit' name='createRoom' onClick={createRoom} variant="contained"> Create Room </BaseButton>
        </FlexContainer>

        </>
    )
}

export default LockoutHome;