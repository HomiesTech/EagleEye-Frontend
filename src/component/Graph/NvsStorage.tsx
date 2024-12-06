import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface NvsStorage {
  nvs_used: number;
  nvs_free: number;
  nvs_total: number;
  time: string;
}

interface Device {
  deviceId: number;
  nvsStorage: NvsStorage[];
}

const NvsStorage: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [storageData, setStorageData] = useState<NvsStorage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Function to fetch NVS storage data based on deviceId
  const fetchNvsStorage = async (id: string) => {
    setLoading(true);
    setError('');

    try {
      // Fetch all devices data
      const response = await axios.get<Device[]>(`https://service.homenetics.in/eagleeye/devices`);
      const devices = response.data;

      // Find the specific device by deviceId
      const device = devices.find((device) => device.deviceId.toString() === id);

      if (device && device.nvsStorage) {
        setStorageData(device.nvsStorage);
      } else {
        setError('Device not found or no NVS storage data available.');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error fetching NVS storage data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deviceId) {
      fetchNvsStorage(deviceId);
      const interval = setInterval(() => fetchNvsStorage(deviceId), 60000);
      return () => clearInterval(interval);
    }
  }, [deviceId]);

  // Chart data configuration
  const chartData = {
    labels: storageData.map((data) => new Date(data.time).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'NVS Used (Bytes)',
        data: storageData.map((data) => data.nvs_used),
        borderColor: '#34D399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Time', color: 'white', font: { size: 16 } },
        ticks: { color: 'grey', font: { size: 14 } },
      },
      y: {
        title: { display: true, text: 'NVS Used (Bytes)', color: 'white', font: { size: 16 } },
        ticks: { color: 'grey', font: { size: 14 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">NVS Storage Usage</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="relative w-full h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default NvsStorage;
