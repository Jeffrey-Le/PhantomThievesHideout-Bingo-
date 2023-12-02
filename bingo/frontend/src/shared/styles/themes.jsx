import { createTheme } from "@mui/system";

// Theme Color Pallete
const p5rBlack = {"RGB": 'rgb(13, 13, 13)', "Hex": '#0d0d0d'};
const p5rRed = {"RGB": 'rgb(217, 35, 35)', "Hex": '#d92323'};
const p5rDarkRed = {"RGB": 'rgb(115, 36, 36)', "Hex": '#732424'};
const p5rTiege = {"RGB": 'rgb(140, 103, 35)', "Hex": '#d8c6723'};
const p5rYellow = {"RGB": 'rgb(242, 232, 82)', "Hex": '#f2e852'};

const theme = {
    palette: {
        primary: {
            main: p5rRed.Hex,
            darkRed: p5rDarkRed.Hex
        },
        secondary: {
            main: p5rBlack.Hex
        },
    },
};

export default theme;