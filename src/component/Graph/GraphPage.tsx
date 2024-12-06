import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface NvsStorage {
  nvs_used: number;
  nvs_total: number;
  time: string;
}

interface SpiffsStorage {
  spiffs_used: number;
  spiffs_total: number;
  time: string;
}

interface WifiSignalStrength {
  strength: number;
  time: string;
}

interface Device {
  deviceId: number;
  nvsStorage: NvsStorage[];
  wifiSignalStrength: WifiSignalStrength[];
  spiffsStorage: SpiffsStorage[];
}

const DeviceGraphs: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [deviceData, setDeviceData] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchDeviceData = async (id: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get<Device[]>(`https://service.homenetics.in/eagleeye/devices`);
      const devices = response.data;

      const device = devices.find((device) => device.deviceId.toString() === id);

      if (device) {
        setDeviceData(device);
      } else {
        setError('Device not found.');
      }
    } catch {
      setError('Error fetching device data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deviceId) {
      fetchDeviceData(deviceId);
      const interval = setInterval(() => fetchDeviceData(deviceId), 60000);
      return () => clearInterval(interval);
    }
  }, [deviceId]);

  const convertToKB = (bytes: number) => {
    return (bytes / 1024).toFixed(2); // Convert bytes to KB and round to 2 decimal places
  };

  // NVS Storage Chart Data
  const nvsChartData = deviceData?.nvsStorage
    ? {
        labels: deviceData.nvsStorage.map((data) =>
          new Date(data.time + "Z").toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
        datasets: [
          {
            label: 'NVS Total (Entries)',
            data: deviceData.nvsStorage.map((data) => data.nvs_total),
            borderColor: '#FBBF24',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            fill: true,  // Area graph
            tension: 0.4,
          },
          {
            label: 'NVS Used (Entries)',
            data: deviceData.nvsStorage.map((data) => data.nvs_used),
            borderColor: '#34D399',
            backgroundColor: 'rgba(52, 211, 153, 0.2)',
            fill: true,  // Area graph
            tension: 0.4,
          },
        ],
      }
    : null;

  // SPIFFS Storage Chart Data
  const spiffsChartData = deviceData?.spiffsStorage
    ? {
        labels: deviceData.spiffsStorage.map((data) =>
          new Date(data.time + "Z").toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
        datasets: [
          {
            label: 'SPIFFS Used (KB)',
            data: deviceData.spiffsStorage.map((data) => convertToKB(data.spiffs_used)),
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            fill: true,  // Area graph
            tension: 0.4,
          },
          {
            label: 'SPIFFS Total (KB)',
            data: deviceData.spiffsStorage.map((data) => convertToKB(data.spiffs_total)),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true, // No fill for the reference line
            tension: 0.4,
          },
        ],
      }
    : null;

  // WiFi Signal Strength Chart Data
  const signalChartData = deviceData?.wifiSignalStrength
    ? {
        labels: deviceData.wifiSignalStrength.map((data) =>
          new Date(data.time + "Z").toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
        datasets: [
          {
            label: 'WiFi Signal Strength (dBm)',
            data: deviceData.wifiSignalStrength.map((data) => data.strength),
            borderColor: '#4F46E5',
            backgroundColor: 'transparent',  // No fill for line chart
            fill: false,  // Line chart
            tension: 0.4,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Time', color: 'white', font: { size: 16 } },
        ticks: { color: 'grey', font: { size: 14 } },
      },
      y: {
        title: { display: true, text: '', color: 'white', font: { size: 16 } },
        ticks: { color: 'grey', font: { size: 14 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Device Data</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* NVS Storage Chart */}
      <div className="relative w-full h-96 mb-8">
        <h2 className="text-lg font-bold mb-2">NVS Storage Usage</h2>
        {nvsChartData ? (
          <Line
            data={nvsChartData}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: { ...chartOptions.scales.y, title: { ...chartOptions.scales.y.title, text: 'NVS Storage (Bytes)' } },
              },
            }}
          />
        ) : (
          <p>No NVS Storage Data</p>
        )}
      </div>

      {/* SPIFFS Storage Chart */}
      <div className="relative w-full h-96 mb-8">
        <h2 className="text-lg font-bold mb-2">SPIFFS Storage Usage</h2>
        {spiffsChartData ? (
          <Line data={spiffsChartData} options={chartOptions} />
        ) : (
          <p>No SPIFFS Storage Data</p>
        )}
      </div>

      {/* WiFi Signal Strength Chart */}
      <div className="relative w-full h-96">
        <h2 className="text-lg font-bold mb-2">WiFi Signal Strength</h2>
        {signalChartData ? (
          <Line
            data={signalChartData}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: { ...chartOptions.scales.y, title: { ...chartOptions.scales.y.title, text: 'Signal Strength (dBm)' } },
              },
            }}
          />
        ) : (
          <p>No Signal Strength Data</p>
        )}
      </div>
    </div>
  );
};

export default DeviceGraphs;
