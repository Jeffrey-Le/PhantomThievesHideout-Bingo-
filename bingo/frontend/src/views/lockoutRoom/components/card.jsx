import React, {useEffect, useState, useRef, useContext} from 'react'
import {Grid, Container} from '@mui/material';
import {BoxStyle, CardGrid} from './cardStyles'

import { useChallengesContext, useInfoContext } from '../../../hooks/context';

// Make a Functional Component Here
function CreateBoard({id}) {
    const info = useInfoContext();
    const [user, setUser] = info.user;
    const [room, setRoom] = info.room;
    const socket = info.socket;

    var boxArray = [];

    for (var i  = 0; i < 25; i++)
    {
        boxArray[i] = {id: i, item: null, value: false, teams: []};
    }

    const [boxes, setBoxes] = useState(boxArray);
    const challenges = useChallengesContext();

    // REFS
    const effectRan = useRef(false);

    useEffect(() => {

        if (effectRan.useEffect === true)
        {
            const tempList = [...boxes];

            for (let i = 0; i < tempList.length; i++)
            {
                if (challenges.data[i].challenge)
                    {
                        tempList[i].item = challenges.data[i].challenge
                    }
            }
            
            setBoxes(tempList);

            socket.emit('loadBoard', id);
        }

        return () => {
            effectRan.useEffect = true
        }
    }, []);

    const handleClick = (boxID) => {
        if (user.team.name !== null)
        {
            const tempList = [...boxes];
            const itemToChange = tempList.find(item => item.id === boxID);

            const removeUser = () => {
                console.log(itemToChange.teams.find(item => JSON.stringify(item.name) === JSON.stringify(user.team.name)))
                if (itemToChange.teams.find(item => JSON.stringify(item.name) === JSON.stringify(user.team.name)))
                {
                    const oldTeamIndex = itemToChange.teams.filter((item) => item.color === user.team.color);
                    oldTeamIndex.forEach((index) => {
                        const indexToRemove = itemToChange.teams.findIndex((item) => item.color === user.team.color);
                        itemToChange.teams.splice(indexToRemove, 1);
                    })

                    return true;
                }
                else
                    return false;

            }

            console.log(itemToChange.teams.length)

            if (itemToChange.value === false)
            {
                itemToChange.teams.push(user.team)
                itemToChange.value = !itemToChange.value;
            }
            else if (itemToChange.teams.length === 1)
                if (removeUser())
                    itemToChange.value = !itemToChange.value;
            if (itemToChange.value === true && !itemToChange.teams.find(item => JSON.stringify(item.name) === JSON.stringify(user.team.name)))
                itemToChange.teams.push(user.team)
            else if (itemToChange.teams.length > 1)
                removeUser();


            setBoxes(tempList);

            socket.emit('changeBoard', tempList, id, room)
        }
        else
            console.log('ERROR TEAM')
    }

    socket.on('signaledBoard', (boardID) => {
        if (boardID === id)
            socket.emit('updateBoard', challenges.data, room, id);
    })
   
    socket.on('loadBoard', (data) => {
        console.log(data)
        
        if (data.BoardID === id)
        {
            const tempList = [...boxes];

            for (let i = 0; i < tempList.length; i++)
            {
                if (data.challenges[i].challenge)
                    {
                        tempList[i].item = data.challenges[i].challenge
                    }
            }
            
            setBoxes(tempList);
        }
    })

    socket.on('changeBoard', (data) => {
        if (data.boardID === id)
        {
            setBoxes(data.boardBoxes)
        }
    })

    const boxSX = (id) => {
        const tempList = [...boxes];
        const boxItem = tempList.find(item => item.id === id);

        var finalColor = null;

        if (boxItem.teams.length === 1)
        {
            finalColor = boxItem.teams[0].color;
        }
        if (boxItem.teams.length > 1)
        {
            const percent = (1/boxItem.teams.length) * 100

            console.log(percent)

            finalColor = 'linear-gradient(135deg'

            for (let teamID = 0; teamID < boxItem.teams.length; teamID++)
            {
                if (teamID > 0)
                {
                    finalColor = finalColor +  ', ' + String(boxItem.teams[teamID].color) + (percent * (teamID)) + '%'
                    finalColor = finalColor +  ', ' + String(boxItem.teams[teamID].color) + (percent * (teamID+1)) + '%'
                }
                else
                    finalColor = finalColor +  ', ' + String(boxItem.teams[teamID].color) + (percent * (teamID+1)) + '%'
            }

            finalColor = finalColor + ')'
        }

        if (boxItem.value === true)
        {
            return(
                {
                    background: String(finalColor)
                }
                    
            )
        }
    }

    return (
        <Container sx={{flex: '2 1 auto'}}>
            <Grid container>
                {boxes.map((box) => {
                    return (
                    <CardGrid xs={2.2} key={box.id}>
                        <BoxStyle sx={boxSX(box.id)} onClick={() => {handleClick(box.id)}}>
                        {box.value ? <div>{box.item}</div> : <div>{box.item}</div>}
                        </BoxStyle>
                    </CardGrid>)
                })}
            </Grid>
        </Container>
    )
}

export default CreateBoard;