import {useEffect, useState} from 'react';
import axios from 'axios';

async function getNumChallenges(amount) {
    try {
        const url = `http://127.0.0.1:5000//challenge/random/${amount}`;
        
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

const useNumChallenges = (amount) => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        getNumChallenges(amount).then((data) => {
            setChallenges([data]);
        })
    }, [])

    return challenges;
}

export default useNumChallenges;