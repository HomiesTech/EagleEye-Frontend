import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import  'chart.js/auto';

interface WifiSignalStrength {
  strength: number;
  time: string;
}

interface Device {
  deviceId: number;
  wifiSignalStrength: WifiSignalStrength[];
}

const SignalStrength: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [signalData, setSignalData] = useState<WifiSignalStrength[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Function to fetch signal strength based on deviceId
  const fetchSignalStrength = async (id: string) => {
    setLoading(true);
    setError('');

    try {
      // Fetch all devices data
      const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
      const devices = response.data;

      // Find the specific device by deviceId
      const device = devices.find((device) => device.deviceId.toString() === id);

      if (device && device.wifiSignalStrength) {
        setSignalData(device.wifiSignalStrength);
      } else {
        setError('Device not found or no signal data available.');
      }
    } catch {
      setError('Error fetching WiFi signal strength.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deviceId) {
      fetchSignalStrength(deviceId);
      const interval = setInterval(() => fetchSignalStrength(deviceId), 60000);
      return () => clearInterval(interval);
    }
  }, [deviceId]);

  // Chart data configuration
  const chartData = {
    labels: signalData.map((data) => new Date(data.time).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'WiFi Signal Strength (dBm)',
        data: signalData.map((data) => data.strength),
        borderColor: '#4F46E5',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Time', color: 'white', font: { size: 24 } }, // Changed color and size of x-axis title
        ticks: { color: 'grey', font: { size:8} }, // Changed color and size of x-axis labels
      },
      y: {
        title: { display: true, text: 'Signal Strength (dBm)', color: 'white', font: { size: 24 } }, // Changed color and size of y-axis title
        ticks: { color: 'grey', font: { size: 16 } }, // Changed color and size of y-axis labels
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">WiFi Signal Strength</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="relative w-full h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SignalStrength;