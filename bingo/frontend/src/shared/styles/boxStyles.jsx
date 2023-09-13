import { useState } from "react";

import { Box } from "@mui/material";
import styled from "@emotion/styled";


const BaseBox = styled(Box, {})({
    display: "inline-block"
});

const FlexBox = styled(BaseBox, {})({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
});

export {BaseBox, FlexBox};