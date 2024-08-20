// src/components/WindSpeedChart.tsx

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

interface WindSpeedChartProps {
  data: Array<{ date: string; speed: number }>; // Modify based on your data structure
}

const WindSpeedChart: React.FC<WindSpeedChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    title: {
      text: "Wind Speed Over Time",
    },
    xAxis: {
      categories: data.map((item) => item.date),
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Wind Speed (m/s)",
      },
    },
    series: [
      {
        name: "Wind Speed",
        data: data.map((item) => item.speed),
        type: "line",
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default WindSpeedChart;
