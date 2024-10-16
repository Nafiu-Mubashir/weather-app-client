import React from "react";
import ApexCharts from "react-apexcharts";

interface AirPollutionChartProps {
  airPollution: {
    main: { aqi: number };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  };
}

const AirPollutionChart: React.FC<AirPollutionChartProps> = ({
  airPollution,
}) => {
  // Map AQI value to color
  const getAqiColor = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "#00E396"; // Green for good
      case 2:
        return "#008FFB"; // Blue for fair
      case 3:
        return "#FEB019"; // Yellow for moderate
      case 4:
        return "#FF4560"; // Red for poor
      case 5:
        return "#775DD0"; // Purple for very poor
      default:
        return "#999999"; // Default color
    }
  };

  // Map AQI value to a status description
  const getAqiStatus = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  // Convert AQI to a percentage (100% for AQI 1, and lower for higher AQI values)
  const getAqiPercentage = (aqi: number) => {
    switch (aqi) {
      case 1:
        return 100; // 100% for Good
      case 2:
        return 80; // 80% for Fair
      case 3:
        return 60; // 60% for Moderate
      case 4:
        return 40; // 40% for Poor
      case 5:
        return 20; // 20% for Very Poor
      default:
        return 0; // Unknown AQI
    }
  };

  // Options for the semi-circular gauge
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar", // Use "radialBar" instead of a generic string
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: false,
            fontSize: "24px",
            offsetY: -10,
          },
        },
      },
    },
    colors: [getAqiColor(airPollution.main.aqi)], // Color based on AQI value
    labels: ["Air Quality"],
  };

  const series = [getAqiPercentage(airPollution.main.aqi)]; // Map AQI value to percentage based on air quality status

  return (
    <div>
      <h2 className="text-xl font-bold">Air Pollution</h2>
      {/* Semi-Circular Gauge */}
      <ApexCharts
        options={options}
        series={series}
        type="radialBar" // Ensure the type is explicitly "radialBar"
        height={300}
      />

      {/* Display Air Quality Status */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">
          Air Quality Status: {getAqiStatus(airPollution.main.aqi)}
        </h3>
      </div>

      {/* Air Pollution Components List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Pollutant Levels</h3>
        <ul className="list-disc pl-5">
          <li>CO: {airPollution.components.co} μg/m³</li>
          <li>NO: {airPollution.components.no} μg/m³</li>
          <li>NO₂: {airPollution.components.no2} μg/m³</li>
          <li>O₃: {airPollution.components.o3} μg/m³</li>
          <li>SO₂: {airPollution.components.so2} μg/m³</li>
          <li>PM2.5: {airPollution.components.pm2_5} μg/m³</li>
          <li>PM10: {airPollution.components.pm10} μg/m³</li>
          <li>NH₃: {airPollution.components.nh3} μg/m³</li>
        </ul>
      </div>
    </div>
  );
};

export default AirPollutionChart;
