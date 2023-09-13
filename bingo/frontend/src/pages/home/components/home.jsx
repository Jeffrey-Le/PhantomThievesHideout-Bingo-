import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import {Route, Router, Routes, useNavigate} from 'react-router'
import logo from './assets/logo.png'

function Home() {
    const pages = [{
        id: 1,
        page: 'Leaderboard'
    },
    {
        id: 2,
        page: 'Lockout'
    }
    ]

    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log(id)
        if (id === 2) {
            console.log('Navigating to Lockout Page')
            setTimeout(() => {
                navigate('/lockout', {replace: true})
            }, 1000)
        }
    }

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
                        <Box sx={{display: 'flex'}}>
                            <Avatar alt='Logo' src={logo}/>
                            <IconButton>Logo</IconButton>
                        </Box>

                        <Box sx={{display: "flex"}}>
                            {pages.map((page) => {
                                return (
                                    <Button key={page} onClick={() => {handleClick(page.id)}} sx={{color: 'white', display: "block"}}>
                                        {page.page}
                                    </Button>
                                )
                            })}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}

export default Home;