import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top" as const,
      // },
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };

  const labels = [
    "2024-06-05",
    "2024-06-15",
    "2024-06-17",
    "2024-06-25",
    "2024-06-26",
    "2024-06-28",
    "2024-06-29",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "支出",
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: "rgba(255,99,132,0.5)",
      },
      {
        label: "収入",
        data: [900, 300, 200, 400, 500, 600, 700],
        backgroundColor: "rgba(53,162,235,0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
