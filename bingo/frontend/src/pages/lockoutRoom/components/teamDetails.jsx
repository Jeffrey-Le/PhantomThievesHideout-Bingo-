import React, { useEffect, useState, useRef } from 'react'
import {Box, Stack, List, ListItemText, ListItem} from '@mui/material'
import {styled} from '@mui/system'
import { LobbyBox, LobbyContainer } from './lobbyStyles'

import { useInfoContext } from '../../../hooks/context'

// Team Boxes
const TeamBox = styled(Box, {})({
    padding: 0,
    margin: 0,
    width: '100%',
    height: '12.5vh',
});

function TeamDetails()  {
    const teamColors = [{name: 'red', color: 'rgba(255, 0, 0, 0.7)'}, {name: 'blue' , color: 'rgba(0, 0, 128, 0.7)'}, 
    {name: 'green', color: 'rgba(0, 128, 0, 0.7)'}, {name: 'yellow', color: 'rgba(255, 255, 0, 0.7)'}];

    let teamBoxesArray = [];

    for (let i = 0; i < 4; i++)
    {
        teamBoxesArray[i] = {id: i, name: teamColors[i].name, teamColor: teamColors[i].color, users: []};
    }

    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    // States
    const [teamBoxes, setTeamBoxes] = useState(teamBoxesArray);
    const [members, setMembers] = useState([]);

    // Refs
    const isConnected = useRef(false);
    
    useEffect(() => {
        const tempUser = user;
        tempUser.team = null;
        setUser(tempUser);

        const connect = () => {

            socket.on('userConnected', (data) => {
                console.log('CONNECTING TEAM DETAILS')
                const oldBoxes = [...teamBoxes];

                setMembers(data);

                console.log(data);

                data.forEach((user) => {
                    if (user.team !== null)
                     {
                        const index = oldBoxes.findIndex(box => box.name === user.team)

                        oldBoxes[index].users.push(user);
                     }
                })

                setTeamBoxes(oldBoxes);
                //socket.disconnect();
            })
        }

        if (isConnected.current === true)
        {
            connect();
        }

        return () => {
            isConnected.current = true;
        }
    }, []);

    const handleClick = (box) => {
        const indexBox = teamBoxes.findIndex(item => item.id === box.id);

        const removeUser = () => {
            teamBoxes.forEach((box) => {
                if (box.users.length > 0)
                {
                    box.users.forEach((member) => {
                        if (member === user)
                        {
                            const index = box.users.indexOf(user);
                            box.users.splice(index, 1);
                        }
                    })
                }
            })

        }

        const addUser = () => {
            console.log(members)
            console.log(user)

            const tempMembers = [...members];
            const userIndex = tempMembers.indexOf(user);
            tempMembers.splice(userIndex, 1);

            setMembers(tempMembers);

            const index = teamColors.findIndex(colors => colors.color == box.teamColor);
    
            const tempUser = user;
            tempUser.team = teamColors[index].name;
            setUser(tempUser);
    
            box.users.push(user);
            members.push(user);
        }

        if (user.team != null)
            removeUser();

        addUser();

        const oldBoxes = [...teamBoxes];

        oldBoxes[indexBox] = box;
            
        setTeamBoxes(oldBoxes);

        socket.emit('changeTeam', members, room, teamBoxes);

    }

    socket.on('changeTeam', (data) => {
        console.log(data)
        setTeamBoxes(data)
        
    })

    return (
        <LobbyContainer>
            <LobbyBox>
                <Stack spacing={0}>
                    {teamBoxes.map((box) => {
                        return (
                        <TeamBox bgcolor={box.teamColor} key={box.id} onClick={() => {handleClick(box)}}>
                            <List>
                                { box.users.length != 0 &&
                                    box.users.map((user) => {
                                        return (
                                            <ListItemText>{user.name}</ListItemText>
                                        )
                                    })
                                }
                                
                                
                            </List>
                        </TeamBox>)
                    })}
                </Stack>
            </LobbyBox>
        </LobbyContainer>
    )
}

export default TeamDetails;