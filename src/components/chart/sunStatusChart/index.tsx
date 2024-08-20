// src/components/SunriseSunsetGauge.tsx

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import React from "react";

HC_more(Highcharts);

interface SunriseSunsetGaugeProps {
  sunrise: number;
  sunset: number;
}

const SunriseSunsetGauge: React.FC<SunriseSunsetGaugeProps> = ({
  sunrise,
  sunset,
}) => {
  const options: Highcharts.Options = {
    title: {
      text: "Sunrise & Sunset Times",
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [
        {
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
          borderWidth: 0,
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      ],
    },
    yAxis: [
      {
        min: 0,
        max: 24,
        title: {
          text: "Hour of the Day",
        },
      },
    ],
    series: [
      {
        name: "Sunrise",
        data: [sunrise],
        type: "gauge",
        tooltip: {
          valueSuffix: " hours",
        },
      },
      {
        name: "Sunset",
        data: [sunset],
        type: "gauge",
        tooltip: {
          valueSuffix: " hours",
        },
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

export default SunriseSunsetGauge;
