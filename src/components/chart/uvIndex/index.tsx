// src/components/UVIndexGauge.tsx

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import React from "react";

HC_more(Highcharts);

interface UVIndexGaugeProps {
  uvIndex: number;
}

const UVIndexGauge: React.FC<UVIndexGaugeProps> = ({ uvIndex }) => {
  const options: Highcharts.Options = {
    title: {
      text: "UV Index",
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
    yAxis: {
      min: 0,
      max: 11,
      title: {
        text: "UV Index",
      },
      labels: {
        format: "{value}",
      },
    },
    series: [
      {
        name: "UV Index",
        data: [uvIndex],
        type: "gauge",
        tooltip: {
          valueSuffix: "",
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

export default UVIndexGauge;
