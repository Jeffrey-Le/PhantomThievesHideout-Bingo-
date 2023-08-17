import {useState, useEffect} from 'react';
import axios from 'axios';

async function getData() {
    try {
        const url = "http://127.0.0.1:5000/get";
        /*const res = await axios.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type':'applications/json'
            }
        });*/
        const res = await axios.get(url,
            {headers: {
            'Content-Type':'applications/json'
        }
    });

        const dataResult = res.data;
        return dataResult;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getRandomSingleChallenge() {
    try {
        const url = "http://127.0.0.1:5000//get/challenge/random";
        
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'applications/json'
            }
        });

        const dataResult = res.data;
        return dataResult;

    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getAllChallenges() {
    try {
        const url = "http://127.0.0.1:5000//get/challenge";
        
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'applications/json'
            }
        });

        const dataResult = res.data;
        return dataResult;

    } catch (err) {
        console.log(err);
        return [];
    }
}


function CardData()
{
    const [bingoCards, setBingoCards] = useState([]);

    useEffect(() => {
        getData().then(data => {
            setBingoCards(data);
        }, [])

        bingoCards.map((item) => {
            console.log(`Result Item ${item.id}: ${item.seed} (SEED)`);
        })
    }, [])
}

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
}

export {CardData, GetRandomBingoCard};