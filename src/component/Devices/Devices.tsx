import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Device {
  deviceId: number;
  ssid: string | null;
  macAddress: string | null;
  ipAddress: string | null;
  activeState: number;
  codeVersion: string | null;
  deviceName: string | null;
}

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Number of devices per page

  const fetchDevices = async (page: number) => {
    setLoading(true);
    setError(null);
    page = page - 1;
    try {
      const url = `http://172.16.0.10/eagleeye/devices?page=${page}&size=${itemsPerPage}&sortFields=activeState&sortOrders=desc`;
      const response = await axios.get(url);
      console.log(response.data);
      setDevices(response.data.content); // Assuming the response contains an `items` array
      setTotalPages(response.data.totalPages || 1); // Assuming total pages are returned
      setLoading(false);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to fetch devices.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices(currentPage);
  }, [currentPage, searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
          {devices.map((device) => (
            <tr key={device.deviceId} className="text-white">
              <td className="p-2 border border-white">
                <Link to={`/monitor/device/${device.deviceId}`} className="text-white-500 hover:underline">
                  {device.deviceId}
                </Link>
              </td>
              <td className="p-2 border border-white">{device.ssid ? device.ssid : device.deviceName ? device.deviceName : "N/A"}</td>
              <td className="p-2 border border-white">
                <Link to={`/monitor/device/${device.deviceId}`} className="text-white-500 hover:underline">
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
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
