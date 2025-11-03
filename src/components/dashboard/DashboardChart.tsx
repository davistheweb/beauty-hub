"use client";
import numberFormat from "@/lib/utils/numberFormat";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

interface IDashboardChartProps {
  labels: string[];
  series: number[];
}

const DashboardChart = ({ labels, series }: IDashboardChartProps) => {
  const colors = ["#1AB65C", "#40C277", "#66CE92", "#8CDAAD", "#8CDAAD"];
  // const series = [10, 20, 15, 30, 25];

  // const total = series.reduce((a, b) => a + b, 0);

  const chartData: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    labels,
    colors,
    legend: { show: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "80%",
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
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      colors: ["#fff"],
    },
  };

  return (
    <div className="flex h-full flex-col items-center gap-5 space-y-4 p-5 lg:w-[292px]">
      {/* Donut chart */}
      <Chart
        options={chartData}
        series={series}
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
                {numberFormat(value)}
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
