import React, { lazy, Fragment, useState } from 'react';
import axios from '../../services/api';
import { iterateObject, formatDate } from '../../services/const';
import { useQuery } from 'react-query';
import Stat from './stat/stat'
import Dropdown from './dropdown/dropdown';
import { Link } from 'react-router-dom';


const Summary = () => {

    const { data, isLoading, isError, error } = useQuery('summary', async () => { return await axios.get('/summary') });
    const [activeCountry, setActiveCountry] = useState('');

    if (isLoading) {

        return <span> Loading... </span>
        
    };

    if (isError) {

        return <span> { error.message } </span>

    };

    const setObjectInfo = (obj) => {
        if (obj) {
            const properties = ['NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths'];
            const result = {};
            for (const key of properties) {
                result[key] = obj[key];
            }
            return result
        }
        return
    };

    const getValidCountriesInfo = data.data.Countries.filter(obj => obj.NewConfirmed !== 0)

    const globalInfo = setObjectInfo(data.data.Global);

    const romaniaInfo = setObjectInfo(data.data.Countries.find(obj => {
        return obj.Country === 'Romania'
    })); 

    const activeCountryInfo = setObjectInfo(data.data.Countries.find(obj => {
        return obj.Country === activeCountry
    }));

    

    const dateToday = formatDate(data.data.Global.Date);



    return (
        <Fragment>
            <div className="w-3/5 mt-5 mx-auto flex justify-around items-start shadow-inner rounded-md">
                <Stat type = {'Global'} keysValues = {iterateObject(globalInfo)}/>
                <Stat type = {'Romania'} keysValues = {iterateObject(romaniaInfo)}/>
                {activeCountry !== '' ? 
                <Stat type= {activeCountry} keysValues = {iterateObject(activeCountryInfo)} /> : null}
                <div style={{maxWidth: 75}} className="flex flex-col justify-center items-center">
                <Dropdown countries={getValidCountriesInfo} setActiveCountry={setActiveCountry}/>
                <Link to="/Romania" className="bg-pink-500 text-white rounded-sm mt-3 px-3 py-1"> See more info on Romania </Link>
                </div>
            </div>
            <p> {dateToday} </p> 
        </Fragment>
    )
}

export default Summary

