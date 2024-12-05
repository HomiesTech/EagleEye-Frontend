import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// Interface definition with codeVersion field added
interface Device {
  deviceId: number;
  ssid: string | null;
  macAddress: string | null;
  ipAddress: string | null;
  activeState: number;
  codeVersion: string | null;  
}

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]); // State to store devices from API
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch devices from API
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
        setDevices(response.data); // Save data from API to state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to fetch devices.");
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter devices based on search query
  const filteredDevices = devices.filter((device) =>
    (device.deviceId || "").toString().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-white">Loading devices...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Devices</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Devices ID..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>

      {/* Device List */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">ID</th>
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">MAC Address</th>
            <th className="p-2 border border-white">IP Address</th>
            <th className="p-2 border border-white">Active</th>
            <th className="p-2 border border-white">Version</th> 
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.deviceId} className="text-white">
              <td className="p-2 border border-white">
              <Link to={`/device/${device.deviceId}`} className="text-white-500 hover:underline">
                  {device.deviceId}
                </Link>

              </td>
              <td className="p-2 border border-white">{device.ssid || "N/A"}</td>
              <td className="p-2 border border-white">
              <Link to={`/device/${device.deviceId}`} className="text-white-500 hover:underline">
                  {device.macAddress || "N/A"}
                </Link>

              </td>
              <td className="p-2 border border-white">{device.ipAddress || "N/A"}</td>
              <td className="p-2 border border-white">
  <span
    className={`px-3 py-1  rounded-full text-black font-bold ${
      device.activeState === 0
        ? "bg-red-500" // Inactive
        : device.activeState === 1
        ? "bg-green-500" // Active
        : device.activeState === 2
        ? "bg-yellow-600" // Warn
        : "bg-gray-200" // Default for unexpected values
    }`}
  >
    {device.activeState === 0
      ? ""
      : device.activeState === 1
      ? ""
      : device.activeState === 2
      ? ""
      : "Unknown"}
  </span>
</td>

              <td className="p-2 border border-white">{device.codeVersion || "N/A"}</td> {/* Display codeVersion */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Devices;
