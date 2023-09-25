import {Box, Container} from '@mui/material'
import {blueGrey} from '@mui/material/colors'
import {styled} from '@mui/system'

const LobbyContainer = styled(Container, {})({
    backgroundColor: 'aqua',
    paddingLeft: 0,
    paddingRight: 0,
    flex: '1 2 auto',
    justifyContent: 'center',
})

// Lobby Box
const bluerGrey = blueGrey[300] //#90a4ae;
const bluererGrey = blueGrey[400] //#78909c;
const bluerererGrey = blueGrey[500] // #607d8b;

const backLin = `linear-gradient(0deg, ${bluerererGrey} 17%, ${bluererGrey} 34%, ${bluerGrey} 51%, ${bluererGrey} 68%, ${bluerererGrey} 85%)`;
// const backRad =`radial-gradient(circle, ${bluerGrey} 20%, ${bluererGrey} 40%, ${bluerererGrey} 70%)`;

const LobbyBox = styled(Box, {})({
    background: `${backLin}`,
    padding: 0,
    margin: 5,
    borderRadius: 8,
    border: 'solid black 3px',
    width: '15vw',
    height: '50vh'
});

export {LobbyContainer, LobbyBox};