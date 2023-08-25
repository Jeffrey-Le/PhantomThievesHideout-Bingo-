import React, {useEffect, useState, useRef} from 'react'
import {Grid, Container} from '@mui/material';
import {BoxStyle, CardGrid} from '../styles/cardStyles'

function loadData() {

}

// Make a Functional Component Here
function CreateBoard(props) {
    var boxArray = [];

    for (var i  = 0; i < 25; i++)
    {
        boxArray[i] = {id: i, item: null, value: false};
    }

    const [boxes, setBoxes] = useState(boxArray);

    // REFS
    const effectRan = useRef(false);

    useEffect(() => {

        if (effectRan.useEffect === true)
            console.log(props.challengesData[0])

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
                {boxes.map((item) => {
                    return (
                    <CardGrid xs={2.2} key={item.id}>
                        <BoxStyle onClick={() => {handleClick(item.id)}}>
                        {boxes[item.id].value ? <div>Complete</div> : <div>{props.challengesData[item.id].challenge}</div>}
                        </BoxStyle>
                    </CardGrid>)
                })}
            </Grid>
        </Container>
    )
}

export default CreateBoard;