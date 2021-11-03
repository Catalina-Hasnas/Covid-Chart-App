import React, { useRef } from 'react';
import { formatString, formatNumber } from '../services/const';

const Stat = React.memo(({type, keysValues}) => {
    const renders = useRef(0);
    console.log('renders:', renders.current++)
    console.log(type, keysValues);
    return (
        <div className='flex flex-col items-center justify-center p-3'>
            <p className='font-mono font-bold text-2xl'> {type === 'summary' ? 'Worldwide' : 'Romania'} </p>
            <div className='flex items-stretch justify-center text-left'>
                <div>
                    {keysValues.keys.map((key, index) => (
                        <p className='text-pink-500' key={index}> {formatString(key)}: </p>
                    ))}
                </div>
                <div className='ml-5'>
                    {keysValues.values.map((value, index) => (
                        <p key={index}> {formatNumber(value)} </p>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Stat