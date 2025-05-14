import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function StatisticsChart() {
  const locationData: {
    [key: string]: {
      years: string[];
      precip: number[];
      yield: number[];
    };
  } = {
    "Robe (ARROBE21)": {
      years: [
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      precip: [
        895.7, 1003.2, 863.5, 749.5, 1034.6, 733.2, 573.9, 1054.7, 947.3,
        1086.5, 962.2, 1098.9, 904.3, 300.7, 276.9,
      ],
      yield: [
        16.44, 19.57, 21.94, 26.828, 24.45, 25.23, 31.13, 31.7, 17.327,
        29.71, 29.93, 23.176, 27.99, 35.3, 24.234,
      ],
    },
    "Combolcha (WOCOMB32)": {
      years: [
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
      ],
      precip: [
        961.3, 896.4, 1007.3, 969.7, 1010, 1108, 749.1, 1144.8, 1007.2,
        1107.9, 70.2, 922.6, 1104.3, 1133,
      ],
      yield: [
        14.35, 16.34, 14.14, 17.434, 15.86, 20.74, 20.21, 20.31, 17.442,
        25.33, 25.97, 19.83, 23.818, 25.92,
      ],
    },
    // Add other locations here following the same structure
  };

  const [selectedLocation, setSelectedLocation] = useState("Robe (ARROBE21)");

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: locationData[selectedLocation].years,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "Precipitation (mm) / Yield (tons/ha)",
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  const series = [
    {
      name: "Precipitation",
      data: locationData[selectedLocation].precip,
    },
    {
      name: "Yield",
      data: locationData[selectedLocation].yield,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Weather and Yield Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Annual precipitation and crop yield for {selectedLocation}
          </p>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="mt-2 border border-gray-300 rounded-md p-1"
          >
            {Object.keys(locationData).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}