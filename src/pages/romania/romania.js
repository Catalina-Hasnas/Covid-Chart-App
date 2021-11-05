import React, {Fragment} from 'react';
import { useLocation } from 'react-router';
import axios from '../../services/api';
import { useQuery } from 'react-query';
import { Bar } from "react-chartjs-2";
import { formatDate } from '../../services/const';


const Romania = () => {

    const { data, isLoading, isError, error } = useQuery('romaniaOctober', async () => { 
      return await axios.get('/country/Romania/status/confirmed?from=2020-02-01T00:00:00Z&to=2020-12-31T00:00:00Z') 
    });

    if (isLoading) {

      return <span> Loading... </span>
        
    };

    if (isError) {

      return <span> { error.message } </span>

    };

    console.log(data);

    const getAllMonthlyCases = () => {
      let months = [
        { name: 'February',
          nr: 2 },
        { name: 'March',
          nr: 3 },
        { name: 'April',
          nr: 4 },
      ];
      let monthsWithDays = [];
      months.map((month) => {
        let oneMonth = {
          name: month.name, 
          days: data.data.filter(obj => obj.Date.includes(`2020-0${month.nr}`))
        };
          monthsWithDays = [...monthsWithDays, oneMonth ];
        })
      return monthsWithDays
    } 

    console.log(getAllMonthlyCases())


    const getDays = () => {
      let arrOfDays = []
      data.data.map((day) => {
        arrOfDays = [...arrOfDays, formatDate(day.Date)]
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
          label: 'nr of Cases',
          data: getCases(),
          backgroundColor:'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
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
      <Fragment>
          <div className="flex justify-around items-center">

          </div>

          {/* <Bar 
            data={chartData} 
            options={options}
            height={500}
            width= {1000}
          /> */}
      </Fragment>
    )
}

export default Romania