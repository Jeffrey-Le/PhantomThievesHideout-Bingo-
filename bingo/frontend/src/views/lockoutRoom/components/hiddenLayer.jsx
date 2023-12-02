import { Paper, Typography } from "@mui/material";


function HiddenLayer({setHidden}) {
    
    const revealCard = () => {
        setHidden(false);
        console.log('hidden layer')
    }

    return (
        <>
           <Paper onClick={() => {revealCard()}}>
                <Typography> Click To Open </Typography>
            </Paper> 
        </>
    )
}

export default HiddenLayer;