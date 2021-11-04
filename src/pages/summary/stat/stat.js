import React, { useMemo } from 'react';
import { formatString, formatNumber } from '../../../services/const';

const Stat = (props) => {
    return (
        <div className='flex flex-col items-center justify-center p-3'>
            <p className='font-mono font-bold text-2xl'> {props.type} </p>
            <div className='flex flex-nowrap items-stretch justify-center text-left'>
                <div>
                    {props.keysValues.keys.map((key, index) => (
                        <p className='text-pink-500 whitespace-nowrap' key={index}> {formatString(key)}: </p>
                    ))}
                </div>
                <div className='ml-5'>
                    {props.keysValues.values.map((value, index) => (
                        <p key={index}> {formatNumber(value)} </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stat