import React from 'react';
import { formatString, formatNumber } from '../../../services/const';
import { motion } from 'framer-motion'
import { Bar } from "react-chartjs-2";


const ChartCard = (props) => {

  const getMonthsNr = props.year === '2020-2021' ? 2 : 1;

  const chartData = {
    labels: props.getMonths(getMonthsNr),
    datasets: [
      {
        label: 'nr of Cases',
        data: props.getCases(props.year),
        backgroundColor:'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {    
      plugins: {
          title: {
            display: true,
            text: props.year
          },
          scales: {
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
          }
      }
  }
    

  return (
    <div>
      <motion.div 
        initial={{y: -25}}
        animate={{y: 0}} 
        transition={{duration: 0.5}}
        className='flex flex-col items-center justify-center p-3'
      >
        {/* <p> {props.year} </p> */}
        <Bar 
          data={chartData} 
          height={props.height}
          width= {props.width}
          options={options}
        />
      </motion.div>
    </div>
  )
}

export default ChartCard