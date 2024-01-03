import { useContext, useEffect, useState } from "react";

import BaseButton from "../../shared/styles/buttonBase";
import { Container, FormControl, FormLabel, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { BaseContainer, FlexContainer } from "../../shared/styles/containerStyles";
import { Routes, Route, useNavigate } from "react-router";

import { HostUser, User} from "../../shared/user";
import styled from "@emotion/styled";

import CenteredTitle from "./components/centeredTitle";
import JoinNavigator from "./components/joinNavigator";
import { useInfoContext } from "../../hooks/context";
import theme from "shared/styles/themes";


function LockoutHome() {
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    useEffect(() => {
        console.log(user);
	    socket.connect();
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
