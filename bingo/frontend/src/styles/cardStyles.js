import styled from '@emotion/styled';
import React from 'react';
import {Grid, Box} from '@mui/material'

// CSS STYLES //
const CardGrid = styled(Grid, {})({
    border: "1px solid black",
    position: "relative",
    width: 120,
    "&::before": {
      display: "block",
      content: "''",
      paddingBottom: "100%"
    }
});

/*const gridStyle = {
    border: "1px solid black",
    position: "relative",
    width: 120,
    "&::before": {
      display: "block",
      content: "''",
      paddingBottom: "100%"
    }
}*/

const BoxStyle = styled(Box, {})({
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  "&:hover": {
    backgroundColor: "lightblue",
    cursor: "pointer"
  },
  "&:active": {
    backgroundColor: "yellow"
  }
});

/*const boxStyle = {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
}*/

export {CardGrid, BoxStyle};