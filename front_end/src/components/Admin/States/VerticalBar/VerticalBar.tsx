
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { TState } from '@customtypes/stateType';
import { useAppSelector } from '@hooks/app';
import './VerticalBar.css'
export default function VerticalBar(props: TState) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { language } = useAppSelector(state => state.language)
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: language === "French" ? ["Pourcentage d'utilisateurs aujourd'hui", "Pourcentage d'utilisateurs au cours de la semaine", "Pourcentage d'utilisateurs au cours du mois", "Utilisateurs inactifs", "Taux de croissance du site"] : ["نسبة المستخدمين اليوم", "نسبة المستخدمين خلال الاسبوع", "نسبة المستخدمين خلال الشهر ", 'المستخدمين غير النشطين', "معدل نمو الموقع"],
            datasets: [
                {
                    label: language === "French" ? 'Activité' : "النشاط ",
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [props.active_today, props.active_week, props.active_month, props.inactive_users, props.average_progress],

                },

            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [props]);

    return (
        <div className="ver">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
