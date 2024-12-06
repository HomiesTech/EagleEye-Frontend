import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface SpiffsEntry {
  spiffs_used: number;
  time: string;
}

interface Device {
  macAddress: string;
  deviceId: number;
  userId?: number | null;
  spiffsStorage?: SpiffsEntry[];
}

interface SpiffsStorageChartProps {
  macAddress: string; // The ID of the user whose device data we want to show
}

const SpiffsStorageChart: React.FC<SpiffsStorageChartProps> = ({ macAddress }) => {
  const [data, setData] = useState<SpiffsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
        const devices = response.data;

        // Filter devices by macAddress
        const userDevices = devices.filter(d => d.macAddress === macAddress);

        // Find a device with SPIFFS data
        const deviceWithSpiffs = userDevices.find(d => d.spiffsStorage && d.spiffsStorage.length > 0);

        if (!deviceWithSpiffs || !deviceWithSpiffs.spiffsStorage) {
          setError(`No device with SPIFFS storage data found for user ${macAddress}.`);
        } else {
          setData(deviceWithSpiffs.spiffsStorage);
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

  if (loading) return <div>Loading SPIFFS chart...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ backgroundColor: '#222', color: '#fff', padding: '20px' }}>
      <h2>SPIFFS Storage Usage for User {macAddress}</h2>
      <AreaChart width={700} height={300} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <defs>
          <linearGradient id="spiffsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fill: '#fff' }} angle={-45} textAnchor="end" height={60}/>
        <YAxis dataKey="spiffs_used" tick={{ fill: '#fff' }}/>
        <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}/>
        <Legend />
        <Area type="monotone" dataKey="spiffs_used" stroke="#82ca9d" fillOpacity={1} fill="url(#spiffsGradient)" />
      </AreaChart>
    </div>
  );
};

export default SpiffsStorageChart;
