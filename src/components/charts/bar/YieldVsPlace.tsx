import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartOne() {
  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 250, // Increased height for better visibility
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%", // Increased from 39% to 60% for wider bars
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Addis Ababa Bole",
        "Arba Minch",
        "Awassa",
        "Axum Air Port",
        "Bahir Dar New",
        "Combolcha",
        "Debre Markos",
        "Debre Zeit (AF)",
        "Dire Dawa",
        "Gode Met",
        "Gondar A.P.",
        "Gore",
        "Jimma",
        "Mekele Air Port Obse",
        "Metehara (NMSA)",
        "Neghele",
        "Nekemte",
        "Robe (ARROBE21)",
        "Robe (BAROBE22)",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: "Average Yield (tons/ha)",
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 10,
        right: 10,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val.toFixed(2)} tons/ha`,
      },
    },
  };

  const series = [
    {
      name: "Average Yield",
      data: [
        21.918125, 21.284214, 21.578571, 20.125455, 22.627986, 19.834929,
        21.771429, 22.226667, 0, 22.827692, 21.113529, 23.539286, 21.957333,
        19.904667, 24.008571, 22.9568, 21.880909, 25.663333, 26.147857,
      ],
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="min-w-[1000px]">
        <Chart options={options} series={series} type="bar" height={250} />
      </div>
    </div>
  );
}