import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartTwo() {
  const options: ApexOptions = {
    colors: ["#465fff", "#4CAF50"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
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
        "Mekele Air Port",
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
    yaxis: [
      {
        title: {
          text: "Precipitation (mm)",
          style: {
            fontSize: "12px",
            color: "#465fff",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Yield (tons/ha)",
          style: {
            fontSize: "12px",
            color: "#4CAF50",
          },
        },
      },
    ],
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
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  // Calculate average precipitation and yield for each location
  const locationData: Record<string, { precip: number; yield: number; count: number }> = {};

  // Sample data from the Excel sheet (you would replace this with actual data processing)
  // For demonstration, I'm showing the structure - in a real app you'd process the Excel data
  const excelData = [
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 947.0,
    "Yield": 16.6
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 1146.1,
    "Yield": 19.57
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 911.7,
    "Yield": 21.002
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 929.4,
    "Yield": 19.872
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 960.8,
    "Yield": 22.76
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 772.2,
    "Yield": 23.858
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 790.2,
    "Yield": 22.664
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 908.5,
    "Yield": 29.14
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 968.3,
    "Yield": 17.281
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 1205.4,
    "Yield": 22.142
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 1403.8,
    "Yield": 17.608
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 1625.2,
    "Yield": 19.346
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 642.5,
    "Yield": 24.806
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 622.0,
    "Yield": 30.42
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 1389.4,
    "Yield": 18.946
  },
  {
    "NAME": "Addis Ababa Bole",
    "PRECIP": 649.1800000000001,
    "Yield": 25.676
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 638.7,
    "Yield": 14.08
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1068.1,
    "Yield": 19.85
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1006.3,
    "Yield": 20.454
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1013.4,
    "Yield": 21.002
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1061.1,
    "Yield": 15.07
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 866.2,
    "Yield": 19.412
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1121.3,
    "Yield": 16.05
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 795.1,
    "Yield": 15.48
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 752.6,
    "Yield": 26.828
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 787.2,
    "Yield": 26.66
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1866.9,
    "Yield": 26.58
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 1241.0,
    "Yield": 24.021
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 686.6,
    "Yield": 28.264
  },
  {
    "NAME": "Arba Minch",
    "PRECIP": 474.3,
    "Yield": 24.26799999999999
  },
  {
    "NAME": "Awassa",
    "PRECIP": 703.7,
    "Yield": 14.0
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1032.3,
    "Yield": 19.85
  },
  {
    "NAME": "Awassa",
    "PRECIP": 922.9,
    "Yield": 18.24
  },
  {
    "NAME": "Awassa",
    "PRECIP": 785.4,
    "Yield": 22.802
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1072.3,
    "Yield": 22.322
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1002.7,
    "Yield": 17.918
  },
  {
    "NAME": "Awassa",
    "PRECIP": 671.8,
    "Yield": 21.556
  },
  {
    "NAME": "Awassa",
    "PRECIP": 980.1,
    "Yield": 17.007
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1183.1,
    "Yield": 19.834
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1156.8,
    "Yield": 26.66
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1038.1,
    "Yield": 26.58
  },
  {
    "NAME": "Awassa",
    "PRECIP": 1277.0,
    "Yield": 23.755
  },
  {
    "NAME": "Awassa",
    "PRECIP": 687.0,
    "Yield": 28.264
  },
  {
    "NAME": "Awassa",
    "PRECIP": 595.9,
    "Yield": 23.352
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 524.4,
    "Yield": 13.85
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 905.9,
    "Yield": 15.6
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 696.8000000000001,
    "Yield": 20.06
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 686.1,
    "Yield": 23.728
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 799.5,
    "Yield": 17.49
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 811.0,
    "Yield": 27.246
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 666.5,
    "Yield": 18.73
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 381.7,
    "Yield": 18.15
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 649.1800000000001,
    "Yield": 25.676
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 967.1,
    "Yield": 19.83
  },
  {
    "NAME": "Axum Air Port",
    "PRECIP": 676.0,
    "Yield": 21.02
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 971.2,
    "Yield": 20.03
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1344.7,
    "Yield": 16.34
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1228.3,
    "Yield": 17.1
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1391.9,
    "Yield": 20.574
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1518.7,
    "Yield": 17.72
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1693.5,
    "Yield": 23.44
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1162.2,
    "Yield": 26.09
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1501.2,
    "Yield": 26.38
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1596.7,
    "Yield": 23.44
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1333.1,
    "Yield": 25.33
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1786.8,
    "Yield": 25.97
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 961.6355102040817,
    "Yield": 21.9618045112782
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1909.3,
    "Yield": 21.616
  },
  {
    "NAME": "Bahir Dar New",
    "PRECIP": 1659.8,
    "Yield": 30.82
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 961.3,
    "Yield": 14.35
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 896.4,
    "Yield": 16.34
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1007.3,
    "Yield": 14.14
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 969.7,
    "Yield": 17.434
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1010.0,
    "Yield": 15.86
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1108.0,
    "Yield": 20.74
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 749.1,
    "Yield": 20.21
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1144.8,
    "Yield": 20.31
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1007.2,
    "Yield": 17.442
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1107.9,
    "Yield": 25.33
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 70.2,
    "Yield": 25.97
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 922.6,
    "Yield": 19.83
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1104.3,
    "Yield": 23.818
  },
  {
    "NAME": "Combolcha",
    "PRECIP": 1133.0,
    "Yield": 25.92
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1236.7,
    "Yield": 19.77
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1396.5,
    "Yield": 16.34
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1483.8,
    "Yield": 16.95
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1272.5,
    "Yield": 21.039
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1227.3,
    "Yield": 18.64
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1337.1,
    "Yield": 21.039
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1059.4,
    "Yield": 23.68
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1166.9,
    "Yield": 24.71
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1437.1,
    "Yield": 16.722
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1330.4,
    "Yield": 25.33
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1669.6,
    "Yield": 25.97
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 17.2,
    "Yield": 26.058
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1454.4,
    "Yield": 16.722
  },
  {
    "NAME": "Debre Markos",
    "PRECIP": 1343.7,
    "Yield": 31.84
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 640.0,
    "Yield": 16.6
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 919.1,
    "Yield": 19.57
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 851.7,
    "Yield": 17.77
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 673.9,
    "Yield": 26.952
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 296.2,
    "Yield": 22.76
  },
  {
    "NAME": "Debre Zeit (AF)",
    "PRECIP": 267.3,
    "Yield": 29.71
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 414.7,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 966.3,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 518.7,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 476.2,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 729.8,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 662.1,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 127.0,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 588.5,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 486.9,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 244.3,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 606.3,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 656.6,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 299.6,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 319.4,
    "Yield": 0.0
  },
  {
    "NAME": "Dire Dawa",
    "PRECIP": 214.6,
    "Yield": 0.0
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 153.5,
    "Yield": 23.802
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 97.9,
    "Yield": 16.55
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 308.9,
    "Yield": 17.14
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 142.2,
    "Yield": 24.954
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 462.6,
    "Yield": 22.36
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 780.24,
    "Yield": 25.676
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 474.9,
    "Yield": 19.66
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 103.7,
    "Yield": 23.37
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 138.2,
    "Yield": 23.37
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 58.0,
    "Yield": 22.85
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 780.24,
    "Yield": 25.676
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 872.5200000000001,
    "Yield": 25.676
  },
  {
    "NAME": "Gode Met",
    "PRECIP": 872.5200000000001,
    "Yield": 25.676
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 972.4,
    "Yield": 12.365
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1069.4,
    "Yield": 16.34
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1024.2,
    "Yield": 18.315
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1144.4,
    "Yield": 22.256
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 960.7,
    "Yield": 19.01
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1235.8,
    "Yield": 21.685
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1002.3,
    "Yield": 22.155
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1090.3,
    "Yield": 22.08
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1382.2,
    "Yield": 25.93
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1268.1,
    "Yield": 25.33
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1292.8,
    "Yield": 25.97
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 961.6355102040817,
    "Yield": 21.9618045112782
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1404.8,
    "Yield": 18.946
  },
  {
    "NAME": "Gondar A.P.",
    "PRECIP": 1236.0,
    "Yield": 23.245
  },
  {
    "NAME": "Gore",
    "PRECIP": 1730.8,
    "Yield": 23.924
  },
  {
    "NAME": "Gore",
    "PRECIP": 1543.7,
    "Yield": 19.57
  },
  {
    "NAME": "Gore",
    "PRECIP": 2085.8,
    "Yield": 10.55
  },
  {
    "NAME": "Gore",
    "PRECIP": 1924.8,
    "Yield": 19.698
  },
  {
    "NAME": "Gore",
    "PRECIP": 1746.8,
    "Yield": 14.84
  },
  {
    "NAME": "Gore",
    "PRECIP": 2217.0,
    "Yield": 23.026
  },
  {
    "NAME": "Gore",
    "PRECIP": 1776.8,
    "Yield": 25.95
  },
  {
    "NAME": "Gore",
    "PRECIP": 2253.7,
    "Yield": 25.37
  },
  {
    "NAME": "Gore",
    "PRECIP": 1773.9,
    "Yield": 23.924
  },
  {
    "NAME": "Gore",
    "PRECIP": 2000.1,
    "Yield": 29.71
  },
  {
    "NAME": "Gore",
    "PRECIP": 1951.9,
    "Yield": 29.93
  },
  {
    "NAME": "Gore",
    "PRECIP": 931.4,
    "Yield": 26.948
  },
  {
    "NAME": "Gore",
    "PRECIP": 1091.3,
    "Yield": 28.076
  },
  {
    "NAME": "Gore",
    "PRECIP": 603.7,
    "Yield": 28.03
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1581.3,
    "Yield": 16.34
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1598.9,
    "Yield": 19.57
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1518.9,
    "Yield": 14.21
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1442.9,
    "Yield": 16.722
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1644.2,
    "Yield": 16.28
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1758.9,
    "Yield": 18.962
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1935.0,
    "Yield": 18.02
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1770.7,
    "Yield": 18.2
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1523.7,
    "Yield": 17.828
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1414.4,
    "Yield": 29.71
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1985.6,
    "Yield": 29.93
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1230.5,
    "Yield": 28.224
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1106.4,
    "Yield": 27.45
  },
  {
    "NAME": "Jimma",
    "PRECIP": 1734.9,
    "Yield": 32.71
  },
  {
    "NAME": "Jimma",
    "PRECIP": 537.9,
    "Yield": 25.214
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 417.0,
    "Yield": 14.32
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 631.3000000000001,
    "Yield": 15.6
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 551.1999999999999,
    "Yield": 18.54
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 529.4,
    "Yield": 23.926
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 413.6,
    "Yield": 19.27
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 692.2,
    "Yield": 23.006
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 500.1,
    "Yield": 19.89
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 705.6,
    "Yield": 16.99
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 439.8,
    "Yield": 20.936
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 622.0,
    "Yield": 19.83
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 572.1,
    "Yield": 21.02
  },
  {
    "NAME": "Mekele Air Port Obse",
    "PRECIP": 631.34,
    "Yield": 25.528
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 444.2,
    "Yield": 16.6
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 588.1,
    "Yield": 19.57
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 454.4,
    "Yield": 17.77
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 435.8,
    "Yield": 18.306
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 590.6,
    "Yield": 22.76
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 419.5,
    "Yield": 18.306
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 314.9,
    "Yield": 29.59
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 583.6,
    "Yield": 29.14
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 615.8,
    "Yield": 23.332
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 439.4,
    "Yield": 29.71
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 591.4,
    "Yield": 29.93
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 675.6,
    "Yield": 23.676
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 175.5,
    "Yield": 22.85
  },
  {
    "NAME": "Metehara (NMSA)",
    "PRECIP": 301.7,
    "Yield": 34.29
  },
  {
    "NAME": "Neghele",
    "PRECIP": 531.6,
    "Yield": 17.66
  },
  {
    "NAME": "Neghele",
    "PRECIP": 503.1,
    "Yield": 19.57
  },
  {
    "NAME": "Neghele",
    "PRECIP": 639.6,
    "Yield": 21.396
  },
  {
    "NAME": "Neghele",
    "PRECIP": 542.7,
    "Yield": 20.01
  },
  {
    "NAME": "Neghele",
    "PRECIP": 723.8,
    "Yield": 28.336
  },
  {
    "NAME": "Neghele",
    "PRECIP": 634.9,
    "Yield": 26.022
  },
  {
    "NAME": "Neghele",
    "PRECIP": 637.8,
    "Yield": 20.8
  },
  {
    "NAME": "Neghele",
    "PRECIP": 510.7,
    "Yield": 14.17
  },
  {
    "NAME": "Neghele",
    "PRECIP": 538.3,
    "Yield": 24.41999999999999
  },
  {
    "NAME": "Neghele",
    "PRECIP": 696.2,
    "Yield": 29.71
  },
  {
    "NAME": "Neghele",
    "PRECIP": 543.1,
    "Yield": 29.93
  },
  {
    "NAME": "Neghele",
    "PRECIP": 724.4,
    "Yield": 27.258
  },
  {
    "NAME": "Neghele",
    "PRECIP": 184.8,
    "Yield": 25.932
  },
  {
    "NAME": "Neghele",
    "PRECIP": 530.4,
    "Yield": 19.45
  },
  {
    "NAME": "Neghele",
    "PRECIP": 236.8,
    "Yield": 25.688
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 2022.8,
    "Yield": 15.14
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 2482.1,
    "Yield": 19.57
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 2010.4,
    "Yield": 14.98
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 2109.3,
    "Yield": 19.582
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 1965.3,
    "Yield": 17.08
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 2520.1,
    "Yield": 24.772
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 498.14,
    "Yield": 19.8
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 1579.2,
    "Yield": 29.71
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 668.3,
    "Yield": 29.93
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 1742.2,
    "Yield": 26.71
  },
  {
    "NAME": "Nekemte",
    "PRECIP": 528.7,
    "Yield": 23.488
  },
  {
    "NAME": "Robe",
    "PRECIP": 895.7,
    "Yield": 16.44
  },
  {
    "NAME": "Robe",
    "PRECIP": 1003.2,
    "Yield": 19.57
  },
  {
    "NAME": "Robe",
    "PRECIP": 863.5,
    "Yield": 21.94
  },
  {
    "NAME": "Robe",
    "PRECIP": 749.5,
    "Yield": 26.828
  },
  {
    "NAME": "Robe",
    "PRECIP": 1034.6,
    "Yield": 24.45
  },
  {
    "NAME": "Robe",
    "PRECIP": 733.2,
    "Yield": 25.23
  },
  {
    "NAME": "Robe",
    "PRECIP": 573.9,
    "Yield": 31.13
  },
  {
    "NAME": "Robe",
    "PRECIP": 1054.7,
    "Yield": 31.7
  },
  {
    "NAME": "Robe",
    "PRECIP": 947.3,
    "Yield": 17.327
  },
  {
    "NAME": "Robe",
    "PRECIP": 1086.5,
    "Yield": 29.71
  },
  {
    "NAME": "Robe",
    "PRECIP": 962.2,
    "Yield": 29.93
  },
  {
    "NAME": "Robe",
    "PRECIP": 1098.9,
    "Yield": 23.176
  },
  {
    "NAME": "Robe",
    "PRECIP": 904.3,
    "Yield": 27.99
  },
  {
    "NAME": "Robe",
    "PRECIP": 300.7,
    "Yield": 35.3
  },
  {
    "NAME": "Robe",
    "PRECIP": 276.9,
    "Yield": 24.234
  },
  {
    "NAME": "Robe",
    "PRECIP": 748.4,
    "Yield": 21.83
  },
  {
    "NAME": "Robe",
    "PRECIP": 1067.1,
    "Yield": 19.57
  },
  {
    "NAME": "Robe",
    "PRECIP": 769.2,
    "Yield": 23.19
  },
  {
    "NAME": "Robe",
    "PRECIP": 855.3,
    "Yield": 19.118
  },
  {
    "NAME": "Robe",
    "PRECIP": 1009.5,
    "Yield": 25.5
  },
  {
    "NAME": "Robe",
    "PRECIP": 668.0,
    "Yield": 28.264
  },
  {
    "NAME": "Robe",
    "PRECIP": 768.8,
    "Yield": 28.6
  },
  {
    "NAME": "Robe",
    "PRECIP": 788.7,
    "Yield": 28.97
  },
  {
    "NAME": "Robe",
    "PRECIP": 982.9,
    "Yield": 26.948
  },
  {
    "NAME": "Robe",
    "PRECIP": 1026.9,
    "Yield": 29.71
  },
  {
    "NAME": "Robe",
    "PRECIP": 999.2,
    "Yield": 29.93
  },
  {
    "NAME": "Robe",
    "PRECIP": 804.6,
    "Yield": 24.394
  },
  {
    "NAME": "Robe",
    "PRECIP": 584.1,
    "Yield": 35.05
  },
  {
    "NAME": "Robe",
    "PRECIP": 585.9,
    "Yield": 24.996
  }
];



  // Process the data to calculate averages (this is a simplified example)
  excelData.forEach(row => {
    if (!locationData[row.NAME]) {
      locationData[row.NAME] = { precip: 0, yield: 0, count: 0 };
    }
    locationData[row.NAME].precip += row.PRECIP;
    locationData[row.NAME].yield += row.Yield;
    locationData[row.NAME].count += 1;
  });

  // Prepare series data
  const precipData = [];
  const yieldData = [];
  
  for (const loc in locationData) {
    precipData.push(locationData[loc].precip / locationData[loc].count);
    yieldData.push(locationData[loc].yield / locationData[loc].count);
  }

  const series = [
    {
      name: "Average Precipitation",
      data: precipData,
    },
    {
      name: "Average Yield",
      data: yieldData,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartTwo" className="min-w-[1000px]">
        <Chart 
          options={options} 
          series={series} 
          type="bar" 
          height={350} 
        />
      </div>
    </div>
  );
}