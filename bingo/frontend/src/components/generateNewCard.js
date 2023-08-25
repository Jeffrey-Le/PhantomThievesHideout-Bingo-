import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import axios from "axios";

import useFetch from "../hooks/useFetch";

import { allChallenges, bingoCards, bingoSetChallenges, numCategoryChallenges, numChallenges } from "../service/links";
import CreateBoard from "./card";

function randomNewSeed() {
    const min = 1001;
    const max = 9999;
    const seed = Math.floor(Math.random() * (max - min) + min);

    return seed;
}

function GenerateNewBingoCard() {
    const amount = 25;
    const categories = ['crafting', 'collectables', 'advancement', 'chase'];

    const [cards, setCards, updateCards] = useFetch(bingoCards);
    const [challenges, setChallenges, updateChallenges, appendChallenges] = useFetch(numChallenges(amount));
    const [isDone, setIsDone] = useState(false);

    // Refs
    const isCardSet = useRef(false);
    const isChallengesSet = useRef(false);
    const isBingoSetUpdated = useRef(false);

    let newSeed = randomNewSeed();

    const cardPost = {
        "seed": newSeed
    }

    useEffect(() => {
        if (isCardSet.current === true)
            setCards(cardPost);

        return () => {
            isCardSet.current = true;
        }
    }, []);

    /*
    useEffect(() => {

        if (isChallengesSet.current === true)
        {
            const append = () => {
                categories.forEach((category) => {
                    const url = numCategoryChallenges(amount, category);
                    appendChallenges(url, {method: 'GET'});
                });
            }

            append()
        }

        return () => {
            isChallengesSet.current = true;
        }
    }, [loadChallenges]);
    */

    useEffect(() => {
        const doUpdate = () => {
            if (cards && challenges)
            {
                const cardID = cards.data.id;
                const data = challenges.data;
                
                for (let i = 0; i < 25; i++)
                {
                    const updatedData = {
                        "bingocard_id": cardID,
                        "position": (i + 1)
                    }
    
                    if (data[i] && cardID != undefined)
                    {
                        // ERROR
                        updateChallenges(updatedData, bingoSetChallenges(data[i].id));  
                    }
                    else
                    {
                        console.log('CARDID DOESNT EXIST')
                    }
                
                }
            }
        }

        if (isBingoSetUpdated.current === true)
        {
            doUpdate()
        }

        return () => {
            isBingoSetUpdated.current = true;
        }

        
    }, [challenges.loading]);

    return (
        <>
            <div>Hello There</div>
            <CreateBoard challengesData={challenges.data}/>
        </>
    )

}

export default GenerateNewBingoCard;