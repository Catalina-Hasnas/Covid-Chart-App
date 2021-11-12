import React, {Fragment} from 'react';
import { useLocation } from 'react-router';
import axios from '../../services/api';
import { useQuery } from 'react-query';
import { months, years, addYearToMonth } from '../../services/const';
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

    console.log(getCasesByMonth())

    const getMonths = (nrOfYears) => {
      let arrOfMonths = [];
      months.map((month) => {
        arrOfMonths = [...arrOfMonths, month.name]
      })
      console.log(addYearToMonth(arrOfMonths, '2020'));

      if (nrOfYears === 1) {
        return arrOfMonths
      }
      return [...addYearToMonth(arrOfMonths, '2020'), ...addYearToMonth(arrOfMonths, '2021')];
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
    <div className="flex flex-col justify-around items-center">
      <ChartCard 
        getCases={getAllCases}
        getMonths={getMonths}
        year={'2020-2021'}
        height={350}
        width={700}
      />

      {/* <div>
        <ChartCard 
          getCases={getCasesByYear}
          getMonths={getMonths}
          year={'2020'}
          height={180}
          // width={350}
        />

        <ChartCard 
          getCases={getCasesByYear}
          getMonths={getMonths}
          year={'2021'}
          height={180}
          // width={700}
        />
      </div> */}

      
    </div>
  )
}

export default Romania