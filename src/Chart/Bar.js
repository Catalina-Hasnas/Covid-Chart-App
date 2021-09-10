import React, { Fragment, useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartDataProps }) => {

    const [ChartData, setChartData] = useState({});

    useEffect(() => {
        let keys = [];
        let values = [];
        for (const [key, value] of Object.entries(chartDataProps)) {
            keys = [...keys, key];
            values= [... values, value];
        }
        console.log(keys);
        console.log(values);
        setChartData({
          labels: keys,
          datasets: [
            {
              label: "Nr of people",
              data: values,
              backgroundColor: [
                "#ffbb11",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ]
            }
          ]
        });
    }, [chartDataProps]);

    console.log(ChartData)


  return (
    <div>
      <Bar
        data={ChartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Covid cases worldwide"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};

export default BarChart