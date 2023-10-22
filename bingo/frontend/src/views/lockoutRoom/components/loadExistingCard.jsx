import { useState, useEffect, useRef , createContext} from "react";

import useFetch from "../../../hooks/useFetch";

import CreateBoard from "./card";

import { bingoCards, bingoSetChallenges, numRandomBingoCards, randomSingleChallenge, numChallenges } from "../../../services/links";

import { ChallengesContext } from "../../../hooks/context";
import socket from "services/socket";

function LoadExistingCard({id}) {
    const [cards, setCards, updateCards, appendCards] = useFetch(numRandomBingoCards(1));
    const [challenges, setChallenges, updateChallenges, appendChallenges] = useFetch(randomSingleChallenge)

    // Refs
    const challengesLoaded = useRef(false)

    useEffect(() => {

        if (challengesLoaded.current === true)
        {
            if (cards.data.length > 0)
            { 
                const cardID = cards.data[0].id
                //setChallenges(null, [], bingoSetChallenges(cardID), {method: 'GET'}, true) GET CHALLENGE BY ID
                setChallenges(null, [], numChallenges(25), {method: 'GET'}, true) // GET FULL RANDOM CHALLENGES
                console.log('Fetching New Chall;enges')
            }
        }

        return () => {
            challengesLoaded.current = true
        }

    }, [cards.data])

    if (challenges)
        console.log('End LoadExistingCard');

    return (
        <>
            {challenges.data.length > 0 &&  <ChallengesContext.Provider value={challenges}> <CreateBoard id={id}/> </ChallengesContext.Provider> }
        </>
    )
    
}

export default LoadExistingCard;