import React from "react";
import ApexCharts from "react-apexcharts";

interface TemperatureChartProps {
  temperatureData: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
  };
}

const TemperatureDonutChart: React.FC<TemperatureChartProps> = ({
  temperatureData,
}) => {
  // Prepare data series for the chart
  const series = [
    temperatureData.temp, // Current temperature
    temperatureData.temp_max, // Max temperature
    temperatureData.temp_min, // Min temperature
    temperatureData.feels_like, // Feels like temperature
  ];

  // Chart options
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Current Temp", "Max Temp", "Min Temp", "Feels Like"], // Label each section of the donut chart
    colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0"], // Different colors for each section
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          labels: {
            show: true,
            total: {
              show: false,
              label: "Temperatures",
              formatter: () => `${temperatureData.temp}°C`, // Show current temp as total in the center
              color: "#FFFFFF", // Make center label text white
            },
          },
        },
      },
    },
    stroke: {
      show: false, // Disable the white border around the chart
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#FFFFFF"], // Set the label text color inside the chart to white
      },
      formatter: function (val: number) {
        return `${val.toFixed(1)}°C`; // Formatting temperature
      },
    },
    legend: {
      position: "right",
      labels: {
        colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"], // Make legend text white
      },
    },
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold">Temperature Overview</h2>
      <ApexCharts
        options={options}
        series={series}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default TemperatureDonutChart;
