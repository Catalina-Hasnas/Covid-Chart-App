import React, {Fragment} from 'react';
import { useLocation } from 'react-router';
import axios from '../../services/api';
import { useQuery } from 'react-query';
import { months, years } from '../../services/const';
import ChartCard from './chartCard/chartCard';



const Romania = () => {

    const { data, isLoading, isError, error } = useQuery('romaniaOctober', async () => { 
      return await axios.get('/country/Romania/status/confirmed?from=2020-02-01T00:00:00Z&to=2021-11-06T00:00:00Z') 
    });

    if (isLoading) {

      return <span> Loading... </span>
        
    };

    if (isError) {

      return <span> { error.message } </span>

    };

    const getCasesByMonth = () => {
      let yearlyCasesByMonth = [];
      years.map((year) => {
        let monthsWithDays = [];
        months.map((month) => {
          const monthNumber = month.nr < 10 ? '0'+month.nr : month.nr;
          let oneMonth = {
            name: month.name, 
            days: data.data.filter(obj => obj.Date.includes(`${year}-${monthNumber}`))
          };
          monthsWithDays = [...monthsWithDays, oneMonth ];
        })

        yearlyCasesByMonth = [...yearlyCasesByMonth, {
          year: year,
          months: monthsWithDays
        }]
      })
      return yearlyCasesByMonth;
    }

    const getMonths = () => {
      let arrOfMonths = [];
      months.map((month) => {
        arrOfMonths = [...arrOfMonths, month.name]
      })
      return [...arrOfMonths, ...arrOfMonths];
      // return arrOfMonths
    }


    const getCasesByYear = (year) => {
      let indexOfYear = year === '2021' ? 1 : 0 
      let arrOfCases = [];
      getCasesByMonth()[indexOfYear].months.map((month) => {
        let totalCases = 0;
        month.days.map((day) => {
          totalCases += day.Cases
        })
        arrOfCases = [...arrOfCases, totalCases]
        })
      return arrOfCases
    }

    const getAllCases = () => {
      let arrOfCases = [];
      getCasesByMonth().map((year) => {
        year.months.map((month) => {
          let totalCases = 0;
          month.days.map((day) => {
            totalCases += day.Cases
          })
          arrOfCases=[...arrOfCases, totalCases]
        })
      })
      return arrOfCases
    }

    return (
      <Fragment>
          <div className="flex justify-around items-center">
            <ChartCard 
              getCases={getAllCases}
              getMonths={getMonths}
              year={'2020-2021'}
            />

            {/* <ChartCard 
              getCases={getCasesByYear}
              getMonths={getMonths}
              year={'2020'}
            />
            <ChartCard 
              getCases={getCasesByYear}
              getMonths={getMonths}
              year={'2021'}
            /> */}
          </div>
      </Fragment>
    )
}

export default Romania