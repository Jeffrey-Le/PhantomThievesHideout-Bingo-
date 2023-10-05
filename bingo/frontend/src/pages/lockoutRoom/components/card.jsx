import React, {useEffect, useState, useRef, useContext} from 'react'
import {Grid, Container} from '@mui/material';
import {BoxStyle, CardGrid} from './cardStyles'

import { useChallengesContext, useInfoContext } from '../../../hooks/context';

// Make a Functional Component Here
function CreateBoard(props) {
    const info = useInfoContext();
    const [room, setRoom] = info.room;
    const socket = info.socket;

    var boxArray = [];

    for (var i  = 0; i < 25; i++)
    {
        boxArray[i] = {id: i, item: null, value: false};
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

            socket.on('signaledBoard', () => {
                console.log('SignaledBoard')
                socket.emit('loadBoard', boxes);
            })

        }

        socket.on('loadBoard', (data) => {
            setBoxes(data);
        })

        return () => {
            effectRan.useEffect = true
        }
    }, [props]);

    const handleClick = (id) => {
        const tempList = [...boxes];
        const itemToChange = tempList.find(item => item.id === id);
        itemToChange.value = !itemToChange.value;
        setBoxes(tempList);
    }

    return (
        <Container sx={{flex: '2 1 auto'}}>
            <Grid container>
                {boxes.map((box) => {
                    return (
                    <CardGrid xs={2.2} key={box.id}>
                        <BoxStyle onClick={() => {handleClick(box.id)}}>
                        {box.value ? <div>Complete</div> : <div>{box.item}</div>}
                        </BoxStyle>
                    </CardGrid>)
                })}
            </Grid>
        </Container>
    )
}

export default CreateBoard;