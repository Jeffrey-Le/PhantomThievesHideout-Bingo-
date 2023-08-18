import { useState, useEffect } from "react";
import axios from "axios";

async function getAllChallenges() {
    try {
        const url = "http://127.0.0.1:5000//get/challenge";
        
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

const useAllChallenges = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
       getAllChallenges().then((data) => {
        setChallenges([data]);
       })
    }, []);

    return challenges;
}

export default useAllChallenges;