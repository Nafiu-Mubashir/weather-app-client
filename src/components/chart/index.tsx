// src/components/BarChart.tsx

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    data: {
        humidity: number;
        feelsLike: number;
        windSpeed: number;
        temperature: number;
    };
}


const BarChart: React.FC<BarChartProps> = ({ data }) => {
   const { t } = useTranslation();
    const chartData = {
        labels: [`${t('Humidity')}`, `${t('Feels Like')}`, `${t('Wind Speed')}`, `${t('Temperature')}`],
        datasets: [
            {
                label: `${t('Weather Data')}`,
                data: [data.humidity, data.feelsLike, data.windSpeed, data.temperature],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
