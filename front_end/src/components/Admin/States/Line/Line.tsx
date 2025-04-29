
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import './Line.css'
import { TLineProps } from '@customtypes/stateType';

export default function Line(props: TLineProps) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        if (props) {
            const data = {
                // labels: ['total_courses', 'total_units', 'total_lessons', 'level_tests'],
                labels: props?.labels,
                datasets: [
                    {
                        label: props?.label,
                        data: props?.data,
                        // data: [20, 30, 30, 20],
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            };

            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        }

    }, [props]);

    return (
        <div className="line">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
