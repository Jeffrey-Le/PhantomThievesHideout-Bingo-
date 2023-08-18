import {useState, useEffect} from 'react';
import axios from 'axios';

async function getBingoCard(type, value) {
    try {
        const url = `http://127.0.0.1:5000/card/${type}=${value}`;
        /*const res = await axios.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type':'applications/json'
            }
        });*/
        console.log(`URL: ${url}`)
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

const useSingleBingoCard = ({id=0, seed=0}) => {
    id = id || 0;
    seed = seed || 0;

    let type = false;
    let valueToUse = 0;
    
    if (id != 0)
    {
        type = 'id';
        valueToUse = id;
    }
    else if (seed != 0)
    {
        type = 'seed';
        valueToUse = seed;
    }

    const [bingoCard, setBingoCard] = useState([]);

    useEffect(() => {
        getBingoCard(type, valueToUse).then((data) => {
            setBingoCard([data]);
        });
    }, []);

    return bingoCard;
}

export default useSingleBingoCard;