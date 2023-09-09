import "./App.css";
import logoWeb from "./assets/logo.png";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = (titleText: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white", // Set the legend text color to white
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: titleText,
        color: "white", // Set the title text color to white
      },
      grid: {
        color: "rgba(255, 255, 255)",
      },
      ticks: {
        color: "white", // Set y-axis tick text color to white
      },
    },
    x: {
      grid: {
        color: "rgba(255, 255, 255)",
      },
      ticks: {
        color: "white", // Set y-axis tick text color to white
      },
    },
  },
});

const processData = (rawData: any[], dataOption: string, slice_nm: number) => {
  const data_length = rawData.length;
  rawData = rawData.slice(data_length - slice_nm, data_length);
  const dates = rawData.map((item) =>
    moment(item.updatedAt).format("HH:mm:ss")
  );
  const collected_data = rawData.map((item) => item[dataOption]);
  return { dates, collected_data };
};

function App() {
  const [vehicleChart, setVehicleChart] = useState([]);

  const classGet = async () => {
    axios
      .get("https://api-sipejamv2.vercel.app/vehicle/getAll")
      .then((response) => {
        setVehicleChart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      classGet();
    }, 2000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
    // Fetch data from the API using Axios
  }, []);

  const slice_param = 20;
  const kb1_data = processData(vehicleChart, "kb1", slice_param);
  const kc1_data = processData(vehicleChart, "kc1", slice_param);
  const s1_data = processData(vehicleChart, "s1", slice_param + 10);
  const kb2_data = processData(vehicleChart, "kb2", slice_param);
  const kc2_data = processData(vehicleChart, "kc2", slice_param);
  const s2_data = processData(vehicleChart, "s2", slice_param + 10);
  const color1 = "rgba(227, 204, 174, 1)";
  const color2 = "rgba(92, 131, 116, 1)";
  const color3 = "rgba(38, 42, 86, 1)";

  const data_chart = (
    label_data: any[],
    label_string: string,
    dates: any[],
    colorbg: string
  ) => ({
    labels: dates,
    datasets: [
      {
        label: label_string,
        data: label_data,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: colorbg,
        color: "rgb(255,255,255)",
        tension: 0.3,
        fill: "origin", // Fill below the line
      },
    ],
  });

  const kb1_data_chart = data_chart(
    kb1_data.collected_data,
    "Total Kendaraan Besar (1 Jam Terakhir)",
    kb1_data.dates,
    color1
  );
  const kb1_option = options("Kendaran Besar");

  const kc1_data_chart = data_chart(
    kc1_data.collected_data,
    "Total Kendaraan Kecil (1 jam terakhir)",
    kc1_data.dates,
    color2
  );
  const kc1_option = options("Kendaran Kecil");

  const s1_data_chart = data_chart(
    s1_data.collected_data,
    "Total Kendaraan Kecil (1 jam terakhir)",
    s1_data.dates,
    color3
  );
  const s1_option = options("Kecepatan Kendaraan (km/jam)");

  const kb2_data_chart = data_chart(
    kb2_data.collected_data,
    "Kecepatan Kendaraan Terakhir",
    kb2_data.dates,
    color1
  );
  const kb2_option = options("Kendaraan Besar");

  const kc2_data_chart = data_chart(
    kc2_data.collected_data,
    "Total Kendaraan Kecil (1 jam terakhir)",
    kc2_data.dates,
    color2
  );
  const kc2_option = options("Kendaran Kecil");

  const s2_data_chart = data_chart(
    s2_data.collected_data,
    "Kecepatan Kendaraan Terakhir",
    s2_data.dates,
    color3
  );
  const s2_option = options("Kecepatan Kendaraan (km/jam)");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light color-second">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img width="50px" src={logoWeb} />
          </a>
          <a>SIPEJAM V2 Website</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
      </nav>

      <div className="container-fluid mt-5">
        {/* Camera1 */}
        <div className="row justify-content-center">
          <h3 className="head1">Overview</h3>
          <h3 className="head2 mt-2">Camera 1</h3>

          <div className="col-5 c-card">
            <h3 className="card-title">Jumlah Kendaraan Besar</h3>
            <Line options={kb1_option} data={kb1_data_chart} />
          </div>

          <div className="col-5 c-card offset-md-1">
            <h3 className="card-title">Jumlah Kendaraan Kecil</h3>
            <Line options={kc1_option} data={kc1_data_chart} />
          </div>
        </div>
        {/* </div> */}

        <div className="row justify-content-center mt-4">
          <div className="col-5 c-card">
            <h3 className="card-title">Kecepatan Kendaraan</h3>
            <Line options={s1_option} data={s1_data_chart} />
          </div>
        </div>

        {/* Camera2 */}
        <div className="row justify-content-center">
          <h3 className="head2 mt-4">Camera 2</h3>

          <div className="col-5 c-card">
            <h3 className="card-title">Jumlah Kendaraan Besar</h3>
            <Line options={kb2_option} data={kb2_data_chart} />
          </div>

          <div className="col-5 c-card offset-md-1">
            <h3 className="card-title">Jumlah Kendaraan Kecil</h3>
            <Line options={kc2_option} data={kc2_data_chart} />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-5 c-card">
            <h3 className="card-title">Kecepatan Kendaraan</h3>
            <Line options={s2_option} data={s2_data_chart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
