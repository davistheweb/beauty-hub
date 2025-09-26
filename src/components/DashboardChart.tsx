"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const DashboardChart: React.FC = () => {
  const labels = [
    "Regular",
    "VIP Package",
    "Family Package",
    "Wedding Package",
    "Deadlocks Package",
  ];

  const colors = ["#1AB65C", "#40C277", "#66CE92", "#8CDAAD", "#B3E7C9"];
  const series = [10, 20, 15, 30, 25];

  // const total = series.reduce((a, b) => a + b, 0);

  const [chartData] = useState({
    series,
    options: {
      chart: {
        toolbar: { show: false },
      },
      labels,
      colors,
      legend: { show: false },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "",
                formatter: () => "All Packages",
              },
            },
          },
        },
      },
      stroke: { width: 10 },
      dataLabels: { enabled: false },
    },
  });

  return (
    <div className="flex h-full flex-col items-center justify-between space-y-4 p-5">
      {/* Donut chart */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="300"
      />
      <div className="flex w-full flex-col gap-6">
        {labels.map((label, i) => {
          const value = series[i];
          //   const percentage = ((value / total) * 100).toFixed(1);

          return (
            <div
              key={i}
              className="flex w-full items-center justify-between"
            >
              <div className="flex h-full w-full items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="text-[14px] font-medium text-[#90A3BF]">
                  {label}
                </span>
              </div>

              <span className="text-sm font-semibold text-[#070500]">
                {value}
                {/* ({percentage}%) */}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardChart;

// "use client";
// import React, { useState } from "react";
// import Chart from "react-apexcharts";

// const Donut: React.FC = () => {
//   const [chartData] = useState({
//     options: {
//       labels: [
//         "Regular",
//         "VIP Package",
//         "Family Package",
//         "Wedding Package",
//         "Deadlocks Package",
//       ],
//       colors: ["#1AB65C", "#40C277", "#66CE92", "#8CDAAD", "#B3E7C9"],
//     },
//     series: [1, 1, 1, 1, 1],
//   });

//   return (
//     <div className="donut">
//       <Chart
//         options={{
//           ...chartData.options,
//           plotOptions: { bar: {
//             borderRadius: 5,
//             borderRadiusApplication: "end"
//           }},
//         }}
//         series={chartData.series}
//         type="donut"
//         width="380"
//       />
//     </div>
//   );
// };

// export default Donut;

// "use client";
// import React, { useState } from "react";
// import Chart from "react-apexcharts";

// const Donut: React.FC = () => {
//   const labels = [
//     "Regular",
//     "VIP Package",
//     "Family Package",
//     "Wedding Package",
//     "Deadlocks Package",
//   ];

//   const colors = ["#1AB65C", "#40C277", "#66CE92", "#8CDAAD", "#B3E7C9"];

//   const [chartData] = useState({
//     series: [1, 1, 1, 1, 1],
//     options: {
//       chart: {
//         toolbar: { show: false },
//       },
//       labels,
//       colors,
//       legend: { show: false }, // hide default legend
//       plotOptions: {
//         pie: {
//           donut: {
//             size: "65%",
//           },
//         },
//       },
//       stroke: { width: 0 },
//     },
//   });

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {/* Donut chart */}
//       <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="donut"
//         width="300"
//       />

//       {/* Custom labels */}
//       <div className="flex flex-col space-y-2">
//         {labels.map((label, i) => (
//           <div
//             key={i}
//             className="flex items-center space-x-2"
//           >
//             <span
//               className="h-3 w-3 rounded-full"
//               style={{ backgroundColor: colors[i] }}
//             />
//             <span className="text-sm font-medium">{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Donut;
