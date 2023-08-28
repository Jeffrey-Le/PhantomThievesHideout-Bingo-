import { useState, useEffect, useRef } from "react";

import useFetch from "../hooks/useFetch";

import CreateBoard from "./card";

import { bingoCards, bingoSetChallenges, numRandomBingoCards, randomSingleChallenge } from "../service/links";

function LoadExistingCard() {
    const [cards, setCards, updateCards, appendCards] = useFetch(numRandomBingoCards(1));
    const [challenges, setChallenges, updateChallenges, appendChallenges] = useFetch(randomSingleChallenge)

    // Refs
    const challengesLoaded = useRef(false)

    useEffect(() => {

        if (challengesLoaded.current === true && cards)
        {
            cardID = cards.data.id;
            setChallenges(null, newUrl=bingoSetChallenges(cardID))
        }

        return () => {
            challengesLoaded.current = true
        }

    }, [challenges.loading])

    print(challenges)

    return (
        <>
            {challenges.loading ? <div> Loading Challenges </div> : <CreateBoard challengsData={challenges.data}/>}
        </>
    )
    
}

export default LoadExistingCard;