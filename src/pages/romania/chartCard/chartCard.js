import React from 'react';
import { formatString, formatNumber } from '../../../services/const';
import { motion } from 'framer-motion'
import { Bar } from "react-chartjs-2";


const ChartCard = (props) => {

    const chartData = {
      labels: props.getMonths(),
      datasets: [
        {
          label: 'nr of Cases',
          data: props.getCases(),
          backgroundColor:'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    // const options = {    
    //     scales: {
    //         y: {
    //             suggestedMin: 0,
    //             suggestedMax: 500
    //         }
    //     }
    // }
    

    return (
        <div>
            <motion.div 
                initial={{y: -25}}
                animate={{y: 0}} 
                transition={{duration: 0.5}}
                className='flex flex-col items-center justify-center p-3'
            >
                <p> {props.year} </p>
                <Bar 
                    data={chartData} 
                    height={250}
                    width= {500}
                />
            </motion.div>
        </div>
    )
}

export default ChartCard