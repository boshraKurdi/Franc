
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { TLineProps } from '@customtypes/stateType';

export default function Curve(props: TLineProps) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: props.labels,
            datasets: [
                // {
                //     label: 'First Dataset',
                //     data: [65, 59, 80, 81, 56, 55, 40],
                //     fill: false,
                //     borderColor: documentStyle.getPropertyValue('--blue-500'),
                //     tension: 0.4
                // },
                {
                    label: props.label,
                    // data: [28, 48, 40, 19, 86, 27, 90],
                    data: props.data,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [props]);

    return (
        <div className="curve">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
