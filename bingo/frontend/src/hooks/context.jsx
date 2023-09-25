import { create } from "@mui/material/styles/createTransitions";
import { createContext, useContext } from "react";
import socket from "../service/socket";

const ChallengesContext = createContext(undefined);

function useChallengesContext() {
    const challenges = useContext(ChallengesContext);

    if (challenges === undefined) {
        throw new Error("useChallengesContext must be used with a ChallengesContext");
    }

    return challenges;
}

const InfoContext = createContext(undefined);

function useInfoContext() {
    const info = useContext(InfoContext);

    if (info === undefined) {
        throw new Error("useInfoContext must be used with a InfoContext");
    }

    return info;
}


export {ChallengesContext, useChallengesContext, InfoContext, useInfoContext};