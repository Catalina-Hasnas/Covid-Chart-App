import React, { lazy, Fragment, useState } from 'react';
import axios from '../services/api';
import Bar from '../Chart/Bar';
import { iterateObject, formatDate } from '../services/const';
import { useQuery } from 'react-query';
import Stat from './stat'
import { Link } from 'react-router-dom';


const Summary = () => {

    const RomaniaPromise = import ('./romania/romania');
    const Romania = lazy(()=> RomaniaPromise);

    const [romaniaDisplay, setRomaniaDisplay] = useState(false);

    const { data, isLoading, isError, error } = useQuery('summary', async () => { return await axios.get('/summary') });

    if (isLoading) {

        return <span> Loading... </span>
        
    };

    if (isError) {

        return <span> { error.message } </span>

    };

    const setObjectInfo = (obj) => {
        const properties = ['NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];
        const result = {};
        for (const key of properties) {
            result[key] = obj[key];
        }
        return result
    };

    const globalInfo = setObjectInfo(data.data.Global);

    const romaniaInfo = setObjectInfo(data.data.Countries.find(obj => {
        return obj.Country === 'Romania'
    })); 

    const dateToday = formatDate(data.data.Global.Date);

    const summaryDisplay = (
        <Fragment>
            <Stat type = {'summary'} keysValues = {iterateObject(globalInfo)}/>
            <Stat type = {'romaniaSummary'} keysValues = {iterateObject(romaniaInfo)}/>
            <div>
                <Link to="/Romania" onClick={() => setRomaniaDisplay(true)}>More info on Romania</Link>
            </div>
        </Fragment>
    )

    const dateDisplay = <p> {dateToday} </p> 


    return (
        <Fragment>
            <div className="w-3/5 mt-5 mx-auto flex justify-around items-center shadow-inner rounded-md">
            {romaniaDisplay? <Romania/> : summaryDisplay}
            </div>
            {romaniaDisplay? null : dateDisplay}

        </Fragment>
    )
}

export default Summary

