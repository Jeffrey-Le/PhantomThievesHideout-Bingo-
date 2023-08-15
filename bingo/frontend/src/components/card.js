import React, {useState} from 'react'
import {Grid, Container} from '@mui/material';
import {BoxStyle, CardGrid} from '../styles/cardStyles'


// Make a Functional Component Here
function CreateBoard() {
    var boxArray = [];

    for (var i  = 0; i < 25; i++)
    {
        boxArray[i] = {id: i, item: null, value: false};
    }

    const [boxes, setBoxes] = useState(boxArray);

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
                        {boxes[item.id].value ? <div>Complete</div> : <div>Your Mom</div>}
                        </BoxStyle>
                    </CardGrid>)
                })}
            </Grid>
        </Container>
    )
}

export default CreateBoard;