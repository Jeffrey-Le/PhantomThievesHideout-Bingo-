import {useState, useEffect} from 'react';
import axios from 'axios';

import useBingoCards from '../hooks/useBingoCards';

function CardData()
{
    const [bingoCards] = useBingoCards([]);
    console.log(bingoCards);
}

/*
function GetRandomBingoCard()
{
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        for (let i = 0; i < 25; i++)
        {
            getRandomSingleChallenge().then(data => {
                setChallenges((challenges) => [...challenges, data]);
            })
        }
    }, [])

    challenges.map((item) => {
        console.log(item);
    })
}*/

export {CardData};