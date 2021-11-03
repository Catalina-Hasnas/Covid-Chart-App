import React from 'react';
import { useLocation } from 'react-router';
import axios from '../../services/api';
import { useQuery } from 'react-query';
import { Bar } from "react-chartjs-2";


const Romania = () => {

    const { data, isLoading, isError, error } = useQuery('romaniaOctober', async () => { 
        return await axios.get('/country/Romania/status/confirmed?from=2021-09-01T00:00:00Z&to=2021-10-01T00:00:00Z') 
    });

    if (isLoading) {

        return <span> Loading... </span>
        
    };

    if (isError) {

        return <span> { error.message } </span>

    };

    console.log(data);



    const getDays = () => {
        let arrOfDays = []
        data.data.map((day) => {
            arrOfDays = [...arrOfDays, day.Date]
        })
        return arrOfDays
    } 

    const getCases = () => {
        let arrOfCases = [];
        data.data.map((day) => {
            arrOfCases = [...arrOfCases, day.Cases]
        })
        return arrOfCases
    }

    const chartData = {
        labels: getDays(),
        datasets: [
          {
            label: '# of Cases',
            data: getCases(),
            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(255, 159, 64, 0.2)',
            // ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)',
            // ],
            // borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      

    return (
        <div>
            <Bar 
                data={chartData} 
                options={options}
                height={500}
                width= {1000}
            />
        </div>
    )
}

export default Romania