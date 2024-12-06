import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface NvsEntry {
  macAddress: string;
  nvs_used: number;
  time: string;
}

interface Device {
  macAddress: string;
  deviceId: number;
  userId?: number | null;
  nvsStorage?: NvsEntry[];
}

interface NvsStorageChartProps {
    macAddress: string;
  // The ID of the user whose device data we want to show
}

const NvsStorageChart: React.FC<NvsStorageChartProps> = ({ macAddress }) => {
  const [data, setData] = useState<NvsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
        const devices = response.data;

        // Filter devices by macAddress
        const userDevices = devices.filter(d => d.macAddress === macAddress);

        // Find a device with NVS data
        const deviceWithNvs = userDevices.find(d => d.nvsStorage && d.nvsStorage.length > 0);

        if (!deviceWithNvs || !deviceWithNvs.nvsStorage) {
          setError(`No device with NVS storage data found for user ${macAddress}.`);
        } else {
          setData(deviceWithNvs.nvsStorage);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch devices data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [macAddress]);

  if (loading) return <div>Loading NVS chart...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ backgroundColor: '#222', color: '#fff', padding: '20px' }}>
      <h2>NVS Storage Usage for User {macAddress}</h2>
      <AreaChart width={700} height={300} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <defs>
          <linearGradient id="nvsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fill: '#fff' }} angle={-45} textAnchor="end" height={60}/>
        <YAxis dataKey="nvs_used" tick={{ fill: '#fff' }}/>
        <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}/>
        <Legend />
        <Area type="monotone" dataKey="nvs_used" stroke="#8884d8" fillOpacity={1} fill="url(#nvsGradient)" />
      </AreaChart>
    </div>
  );
};

export default NvsStorageChart;
