import {useState, useEffect} from 'react';
import axios from 'axios';

async function getAllBingoCards() {
    try {
        const url = "http://127.0.0.1:5000/card";
        /*const res = await axios.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type':'applications/json'
            }
        });*/
        const response = await axios.get(url,
            {headers: {
            'Content-Type':'applications/json'
        }
    });

        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const useBingoCards = () => {
    const [bingoCards, setBingoCards] = useState([]);

    useEffect(() => {
        getAllBingoCards().then((data) => {
            setBingoCards([data]);
        });
    }, []);

    return bingoCards;
}

export default useBingoCards;