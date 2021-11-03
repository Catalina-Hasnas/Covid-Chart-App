import React, { Fragment, useState, useEffect, useMemo } from 'react';
import axios from '../services/api';
import Bar from '../Chart/Bar';
import { iterateObject, formatDate } from '../services/const';
import { useQuery } from 'react-query';
import Stat from './stat'


const Summary = () => {

    const [counter, setCounter] = useState(1);
    const [globalSummary, setGlobalSummary] = useState({});
    const [romaniaSummary, setRomaniaSummary] = useState({});
    const [date, setDate] = useState(0);

    const setObjectInfo = (obj) => {
        const properties = ['NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];
        const result = {};
        for (const key of properties) {
            result[key] = obj[key];
        }
        return result
    };

    useEffect(() => {
        const fetchSummary = async () => {
        const response = await axios.get('/summary');
        setGlobalSummary(setObjectInfo(response.data.Global));
        const romaniaData = setObjectInfo(response.data.Countries.find(obj => {
        return obj.Country === 'Romania'}));
        setRomaniaSummary(romaniaData);
        setDate(response.data.Global.Date)
        
    };  
        fetchSummary();
    }, []);

    const memoizedGlobalSummary = useMemo(() => iterateObject(globalSummary), [globalSummary]);
    const memoizedRomaniaSummary = useMemo(() => iterateObject(romaniaSummary), [romaniaSummary]);


    return (
        <Fragment>
            <div className="w-3/5 mt-5 mx-auto flex justify-around shadow-inner rounded-md">
                <Stat type = {'summary'} keysValues = {memoizedGlobalSummary}/>
                <Stat type = {'romaniaSummary'} keysValues = {memoizedRomaniaSummary}/>
            </div>
            <p> {date} </p> 
            <button style={{'padding': 20, 'backgroundColor': 'white'}} onClick={() => setCounter( counter => counter+1)}> </button>
            <p>{counter}</p>
        </Fragment>
    )
}

export default Summary

