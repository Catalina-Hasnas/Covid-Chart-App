import React, { Fragment, useEffect, useState } from 'react';
import axios from '../services/api';
import Bar from '../Chart/Bar';
import { iterateObject, formatString, formatNumber } from '../services/const';


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
        <div className="w-2/5 h-44 mt-5 mx-auto shadow-inner rounded-md">
            <Stat keysValues = {iterateObject(Summary, true)}/>
        </div>
    )
}

export default Summary

const Stat = (props) => {
    return (
        <Fragment>
            {props.keysValues.map((key, index) =>  (
                <div key={index}>
                    <span className="dark:text-pink-500 text-xs"> {formatString(key[0])}: </span>
                    <span className="text-xs">  {formatNumber(key[1])} </span>
                </div>
                ))
            } 
        </Fragment>
    )
}
