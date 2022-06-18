import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import dayjs from "dayjs";
import styles from "../styles/Chart.module.css";

export const Chart = ({
  chartData,
  quoteData,
  symbols,
  selected,
  selectedRange,
}) => {
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    if (!(chartData && quoteData)) {
      return;
    }

    const timestamp = chartData[selected].data.chart.result[0].timestamp;
    const datetime = timestamp.map((item) => {
      const date = new Date(item * 1000).toLocaleString("en-US", {
        timeZone: "America/New_York",
      });

      const formattedDate =
        selectedRange === "1d"
          ? dayjs(date).format("HH:mm a")
          : dayjs(date).format("MMM D");

      return formattedDate;
    });

    setData({
      labels: datetime,
      datasets: [
        {
          borderColor: "rgb(0, 152, 219)",
          data: chartData[selected].data.chart.result[0].indicators.quote[0]
            .close,
          lineTension: 0,
        },
      ],
    });
    setOptions({
      plugins: {
        legend: {
          display: false,
        },
      },
    });
  }, [chartData, quoteData, selected]);

  if (data !== undefined) {
    return (
      <>
        <div className={styles.chart}>
          <Line data={data} options={options} />
        </div>
      </>
    );
  }
};
export default Chart;
