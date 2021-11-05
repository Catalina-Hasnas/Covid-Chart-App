import React, { lazy, Fragment, useState } from 'react';
import axios from '../../services/api';
import { iterateObject, formatDate } from '../../services/const';
import { useQuery } from 'react-query';
import Stat from './stat/stat'
import Dropdown from './dropdown/dropdown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'



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
        <div className="flex justify-around items-center">
            <Stat type = {'Global'} keysValues = {iterateObject(globalInfo)}/>
            <Stat type = {'Romania'} keysValues = {iterateObject(romaniaInfo)}/>
            {activeCountry !== '' ? 
            <Stat type= {activeCountry} keysValues = {iterateObject(activeCountryInfo)} /> : null}
            <div className="w-26 flex flex-col justify-center items-center text-left">
                <Dropdown countries={getValidCountriesInfo} setActiveCountry={setActiveCountry}/>
                <motion.div 
                    whileHover={{
                        // backgroundColor: '#EC4899',
                        // color: 'white',
                        textShadow: '0px 0px 3px rgb(236, 72, 153)',
                        boxShadow: '0px 0px 6px rgb(236, 72, 153)'
                    }}
                    transition={{ duration: 0.3, ease: "easeIn" }}
                    className="border border-pink-500 text-pink-500 rounded-sm mt-3 px-3 py-1"
                > 
                    <Link to="/Romania" >
                        See more info on Romania 
                    </Link>
                </motion.div>
            </div>
            <p> {dateToday} </p> 
        </div>
    )
}

export default Summary

