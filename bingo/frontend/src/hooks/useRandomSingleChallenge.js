import {useEffect, useState} from 'react';
import axios from 'axios';

async function getRandomSingleChallenge() {
    try {
        const url = "http://127.0.0.1:5000//get/challenge/random";
        
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'applications/json'
            }
        });

        return response.data;

    } catch (err) {
        console.log(err);
        return [];
    }
}

const useRandomSingleChallenge = async () => {
    const [challenge, setChallenge] = useState([]);

    useEffect(() => {
        getRandomSingleChallenge().then((data) => {
            setChallenge([data]);
        })
    }, [])

    return challenge;
}

export default useRandomSingleChallenge;