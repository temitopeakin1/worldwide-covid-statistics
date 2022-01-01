import React, { useState, useEffect } from 'react';
import {fetchDailyData } from '../../api';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

// destructure the data from the api

const Chart = ({ data: {confirmed, deaths, recovered}, country}) => 
{
    const [dailyData, setDailyData] = useState([]);

    // useEffect accepts a Callback
    useEffect(() => {
        const fetchAPI = async () => {
        
            setDailyData(await fetchDailyData()); // call the setDaily data to populate figures
        }
        
        fetchAPI();
    }, []); // empty array means that the useEffect will only run once.

    // for the global view of the data
    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        // object desstructuring
                        labels: dailyData.map(({ date }) => date), // destructuring the date and return date
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0,  0, 0.5)',
                            fill: true,
                        }],
                    }}
                />) : null
    );
    

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value],
                        }]
                    }}
                    options={{
                        legends: { display: false },
                        title: { display: true, text: `Current state in ${country}`}, // Template Strings
                    }}
                />
                
            ) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}  
            </div>
     )
}
 
export default Chart;