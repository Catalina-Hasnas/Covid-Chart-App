import React, { Fragment, useEffect, useState } from 'react';
import axios from '../services/api';
import Bar from '../Chart/Bar';

const Summary = () => {

    const [Summary, setSummary] = useState({});

    const fetchSummary = async () => {
        const data = await axios.get('/summary');
        setSummary(data.data.Global);
        console.log(data.data.Global);
    };

    useEffect(() => {
        fetchSummary()
    }, []);
    
    return (
        <div>
            <Bar chartDataProps={Summary}/>
        </div>
    )
}

export default Summary
