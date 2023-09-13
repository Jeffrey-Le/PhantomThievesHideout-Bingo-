import {useState, useEffect, useCallback, useReducer, useRef} from 'react';
import axios from 'axios';

/*
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});

    console.log('use fetch started');

    const setFetch = useCallback((url, oldData = [], options = {}) => {
        console.log('set fetch is activated');
        setData(oldData);
        setOptions(options);
        setLoading(true);
    }, []);

    useEffect(() => {
        if(!loading)
            return;

        const fetchData = async () => {
            try {
                const response = await axios(url, options);
                setData([...data, response.data]);
            } catch (err) {
                const response = err.response ? err.response.data : "Server error";
                setError(response);
            }
            setLoading(false);
        }
        fetchData();
    }, [loading, options, url]);

    

    return [{data, loading, error}, setFetch];
}
*/

/*
function useFetch(url, options={}) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [done, setDone] = useState(false);

    function request()
    {
        const fetchData = async () => {
            try {
                const response = await axios(url, options);
                setData([response.data]);
                setDone(true);
            } catch (err) {
                const response = err.response ? err.response.data : "Server error";
                setError(response);
            }
        }
        fetchData();
    }

    function appendData(newUrl, newOptions={})
    {
        const addData = async () => {
            try {
                const response = await axios(newUrl, newOptions);
                const resultData = await response.data;

                const newState = {...data};
                
                Object.values(resultData).forEach((item) => {
                    Object.values(newState)[0].push(item);
                })

                setData(newState);
            } catch (err) {
                setError(err);
            }
        }

        addData();
    }

    return {request, appendData, data, error, done};
}
*/

function useFetch(url, options={}, oldData=[]) {
    const [data, setData] = useState(oldData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Refs
    const getRan = useRef(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios(url, options);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(error);
            }
        }

        if (getRan.current === true)
        {
            fetchData();
        }

        return () => {
            getRan.current = true;
        }
    }, []);

    const setFetch = async (newData, oldData=[], newUrl=url, options={method: 'POST', data: null}) => {
        /*
        console.log('Data: ', data);
        console.log('OldData: ', oldData);
        setData(oldData);
        */
        setError(false);
        setLoading(true);
        try {
            
            if (newData != null)
                options.data = newData;

            const response = await axios(newUrl, options);
            const resultData = await response.data;

            setData(resultData);

            setLoading(false);
        } catch (err){
            setError(err);
        }
    }

    const updateData = async (newData, newUrl=url, options={method: 'PUT', data: null}) => {
        setError(false);
        setLoading(true);
        try {
            options.data = newData;
            const response = await axios(newUrl, options);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }

    function appendData(newUrl, newOptions={})
    {
        setError(false);
        setLoading(true);
        const addData = async () => {
            try {
                console.log(data);
                const response = await axios(newUrl, newOptions);
                const resultData = await response.data;

                const newState = [...data];

                const test = newState.concat(resultData);
                
                setData(test);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        }

        addData();
    }

    return [{data, loading, error}, setFetch, updateData, appendData];
}
export default useFetch;