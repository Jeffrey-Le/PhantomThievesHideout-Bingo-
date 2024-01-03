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

function TeamDetails({members, setMembers})  {
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

    socket.on('userConnected', (existingUsers) => {
        // Give User a null team

        const tempUser = user;
        tempUser.team = {"name": null, "color": null};
        setUser(tempUser);

        const tempBoxes = [...teamBoxes];

        existingUsers.forEach((user) => {
            if (user.team.name != null)
            {
                const index = tempBoxes.findIndex(box => box.name === user.team.name)

                if (!tempBoxes[index].users.find((item) => JSON.stringify(item).sid === JSON.stringify(user).sid))
                tempBoxes[index].users.push(user);
            }
        })

        setTeamBoxes(tempBoxes);
    })

    const removeUser = (orginalBoxes, userToRemove) => {
        orginalBoxes.forEach((box) => {
            if (box.users.find((item) => JSON.stringify(item.sid) === JSON.stringify(userToRemove.sid)))
            {
                const oldUserIndex = box.users.findIndex((item) => JSON.stringify(item.sid) === JSON.stringify(userToRemove.sid));
                console.log(oldUserIndex)
                box.users.splice(oldUserIndex, 1);
            }
        })
    }

    const handleClick = (box) => {
        const tempBoxes = [...teamBoxes];
        var oldTeam = null;

        const addUser = () => {
            const tempUser = user;
            tempUser.team.name = box.name;
            tempUser.team.color = box.teamColor;

            box.users.push(tempUser);

            setUser(tempUser);
        }

        // remove team from old color
        console.log('User before Remove: ', user)
        if (user.team.name != null)
        {
            oldTeam = user.team.name;
            removeUser(tempBoxes, user)
        }
            

        // base case: add user to box users
        addUser();

        setTeamBoxes(tempBoxes);

        socket.emit('changeTeam', oldTeam, user, room, tempBoxes);
    }
   
    socket.on('changeTeam', (data) => {
        console.log(data.teamBoxes)
        setTeamBoxes(data.teamBoxes)
    })

    socket.on('userDisconnect', (removedUser) => {
        console.log('IN TEAM BOXES DC')
        const tempBoxes = [...teamBoxes];

        removeUser(tempBoxes, removedUser)

        setTeamBoxes(tempBoxes)

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
