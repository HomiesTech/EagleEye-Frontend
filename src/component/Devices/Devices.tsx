import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Device {
  syncTime: ReactNode;
  deviceId: number;
  ssid: string | null;
  macAddress: string | null;
  ipAddress: string | null;
  activeState: number;
  codeVersion: string | null;
  deviceName: string | null;
}

interface DeviceResponse {
  content: Device[];
  totalPages: number;
}

const Devices: React.FC = () => {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const deduplicateDevices = (deviceArray: Device[]): Device[] => {
    const deviceMap = new Map<string, Device>();
    for (const device of deviceArray) {
      const key = device.macAddress?.toLowerCase() || `id-${device.deviceId}`;
      deviceMap.set(key, device); // last one wins
    }
    return Array.from(deviceMap.values());
  };

  const fetchAllDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      let allData: Device[] = [];
      let page = 0;
      let totalPages = 1;

      while (page < totalPages) {
        const url = `https://monitor.homenetics.in/eagleeye/devices?page=${page}&size=50&sortFields=activeState&sortOrders=desc`;
        const response = await axios.get<DeviceResponse>(url);
        allData = [...allData, ...response.data.content];
        totalPages = response.data.totalPages;
        page++;
      }

      const dedupedAll = deduplicateDevices(allData);
      setAllDevices(dedupedAll);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch all devices.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDevices();
    const intervalId = setInterval(() => {
      fetchAllDevices();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim());
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Filtered Devices for search
  const filteredDevices = searchQuery
    ? allDevices.filter((device) =>
        device.macAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.deviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.ssid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.deviceId.toString().includes(searchQuery)
      )
    : allDevices;

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);

  const displayedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          placeholder="Search MAC, Name, SSID or ID..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>

      {/* Device Table */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">ID</th>
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">MAC Address</th>
            <th className="p-2 border border-white">IP Address</th>
            <th className="p-2 border border-white">Active</th>
            <th className="p-2 border border-white">Version</th>
            <th className="p-2 border border-white">SyncTime</th>
          </tr>
        </thead>
        <tbody>
          {displayedDevices.map((device) => (
            <tr key={device.deviceId} className="text-white">
              <td className="p-2 border border-white">
                <Link to={`/monitor/device/${device.deviceId}`} className="text-white hover:underline">
                  {device.deviceId}
                </Link>
              </td>
              <td className="p-2 border border-white">{device.ssid || device.deviceName || "N/A"}</td>
              <td className="p-2 border border-white">
                <Link to={`/monitor/device/${device.deviceId}`} className="text-white hover:underline">
                  {device.macAddress || "N/A"}
                </Link>
              </td>
              <td className="p-2 border border-white">{device.ipAddress || "N/A"}</td>
              <td className="p-2 border border-white">
                <span
                  className={`px-3 py-1 rounded-full text-black font-bold ${
                    device.activeState === 0
                      ? "bg-red-500"
                      : device.activeState === 1
                      ? "bg-green-500"
                      : device.activeState === 2
                      ? "bg-yellow-600"
                      : "bg-gray-200"
                  }`}
                >
                  {device.activeState === 0
                    ? "Inactive"
                    : device.activeState === 1
                    ? "Active"
                    : device.activeState === 2
                    ? "Waiting"
                    : "Unknown"}
                </span>
              </td>
              <td className="p-2 border border-white">{device.codeVersion || "N/A"}</td>
              <td className="p-2 border border-white">
                {device.syncTime
                  ? new Date(device.syncTime + "Z").toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4 text-white">
        <button
          className="px-4 py-2 bg-gray-700 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Devices;
