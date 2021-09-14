import React, { Fragment, useEffect, useState } from 'react';
import axios from '../services/api';
import Bar from '../Chart/Bar';
import { iterateObject, formatString, formatNumber, formatDate } from '../services/const';


const Summary = () => {

    const [Summary, setSummary] = useState({});
    const [RomaniaSummary, setRomaniaSummary] = useState({});
    const [DateToday, setDateToday] = useState('')

    const fetchSummary = async () => {
        const data = await axios.get('/summary');
        setSummary(setObjectInfo(data.data.Global));
        const romaniaSummary = data.data.Countries.find(obj => {
            return obj.Country === 'Romania'
        })
        setRomaniaSummary(setObjectInfo(romaniaSummary));
        setDateToday(formatDate(data.data.Global.Date));
    };

    const setObjectInfo = (obj) => {
        return {
            NewConfirmed: obj.NewConfirmed,
            TotalConfirmed: obj.TotalConfirmed,
            NewDeaths: obj.NewDeaths,
            TotalDeaths: obj.TotalDeaths,
            NewRecovered: obj.NewRecovered,
            TotalRecovered: obj.TotalRecovered
        }
    }

    useEffect(() => {
        fetchSummary(DateToday)
    }, []);
    
    return (
        <Fragment>
            <div className="w-2/5 mt-5 mx-auto flex justify-around shadow-inner rounded-md">
                <Stat type = {'summary'} keysValues = {iterateObject(Summary, true)}/>
                <Stat type = {'romaniaSummary'} keysValues = {iterateObject(RomaniaSummary, true)}/>
            </div>
            <p> {DateToday} </p> 
        </Fragment>
    )
}

export default Summary

const Stat = (props) => {
    return (
        <div>
            {props.type === 'summary' ? <p> Worldwide: </p> : <p> Romania: </p>}
            {props.keysValues.map((key, index) =>  (
                <div key={index}>
                    <span className="dark:text-pink-500 text-xs"> {formatString(key[0])}: </span>
                    <span className="text-xs">  {formatNumber(key[1])} </span>
                </div>
                ))
            }
        </div>
    )
}
