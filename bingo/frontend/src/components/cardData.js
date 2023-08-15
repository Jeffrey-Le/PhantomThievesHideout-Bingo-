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
        const res = await axios.get(url, {headers: {
            'Content-Type':'applications/json'
        }});

        const dataRes = res.data;
        return dataRes
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
        })

        bingoCards.map((item) => {
            console.log(`Result Item ${item.id}: ${item.seed} (SEED)`);
        })
    }, [])
}

export default CardData;