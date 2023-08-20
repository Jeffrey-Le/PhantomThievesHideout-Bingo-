import {useState, useEffect} from 'react';
import axios from 'axios';

async function fetchData(url) {
    try {
        //const url = url;
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

async function manageData(url, method, newData) {
    try {
        const response = await axios.request({
            method: method,
            url: url,
            data: newData,
            config: {headers: {
                'Accept': 'applications.json',
                'Content-Type':'applications/json'
            }}
        });
        
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const useFetch = (url, method='GET', newData=null) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        method = method.toUpperCase();
        
        if (method === 'GET')
        {
            fetchData(url).then((result) => {
                setData([result]);
            });
        }
        else if (method === 'POST')
        {
            manageData(url, method, newData).then((result) => {
                setData([result]);
            });
        }
        else if (method === 'PUT')
        {
            manageData(url, method, newData).then((result) => {
                setData([result]);
            });
        }
        else
        {
            console.log('Please give a method parameter');
            return undefined;
        }
    }, [url]);

    return data;
}

export default useFetch;