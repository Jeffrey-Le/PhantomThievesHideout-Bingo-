import { useState } from "react";

import { Container } from "@mui/material";
import styled from "@emotion/styled";


const BaseContainer = styled(Container, {})({
    display: "inline-block"
});

const FlexContainer = styled(BaseContainer, {})({
    display: 'flex'
});

export {BaseContainer, FlexContainer};