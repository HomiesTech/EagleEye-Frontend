import React, { useState, useEffect } from "react";
import axios from "axios";

// Define Device interface
interface Device {
  devId: number;
  userId: number;
  macAddress: string | null;
  createdAt: string;
  updatedAt: string;
  lastConnectionAt: string | null;
}
interface DevicesApiResponse {
  devices: Device[];
  totalPages: number;
}

const DeviceTable: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]); // API device list
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [page, setPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(2); // Page size
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [notification, setNotification] = useState<string | null>(null); // Notification

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DevicesApiResponse>(
          `https://service.homenetics.in/database/api/devices?page=${page}&pageSize=${pageSize}`
        );
        setDevices(response.data.devices); // Set the devices from API
        setTotalPages(response.data.totalPages); // Set total pages
        setLoading(false);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to fetch devices.");
        setLoading(false);
      }
    };

    fetchDevices();
  }, [page, pageSize]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };

  const handleDelete = async (deviceId: number) => {
    const userInput = prompt(
      `To confirm deletion, type the word "delete". This action cannot be undone.`
    );

    if (userInput?.toLowerCase() === "delete") {
      try {
        await axios.delete<{ message: string }>(
          `https://service.homenetics.in/database/api/devices/${deviceId}`
        );
        setDevices((prevDevices) =>
          prevDevices.filter((device) => device.devId !== deviceId)
        );
        setNotification("Device deleted successfully.");
      } catch (error) {
        console.error("Error deleting device:", error);
        setNotification("Error deleting the device.");
      }
    } else {
      setNotification("Deletion canceled.");
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.devId.toString().includes(searchQuery.toLowerCase())
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

      {/* Notification */}
      {notification && <div className="mb-4 text-green-500">{notification}</div>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search id ..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>
      {/* Total devices info */}
      <div className="mb-4 text-white font-bold">Total Devices: {filteredDevices.length}</div>

      {/* Device Table */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">S.NO</th>
            <th className="p-2 border border-white">ID</th>
            <th className="p-2 border border-white">MAC Address</th>
            <th className="p-2 border border-white">Created At</th>
            <th className="p-2 border border-white">Updated At</th>
            <th className="p-2 border border-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={device.devId} className="text-white">
              <td className="p-2 border border-white">{index + 1 + (page - 1) * pageSize}</td>
              <td className="p-2 border border-white">{device.devId}</td>
              <td className="p-2 border border-white">{device.macAddress || "N/A"}</td>
              <td className="p-2 border border-white">{new Date(device.createdAt).toLocaleString()}</td>
              <td className="p-2 border border-white">{new Date(device.updatedAt).toLocaleString()}</td>
              <td className="p-2 border border-white">
                <button
                  onClick={() => handleDelete(device.devId)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div>
          Page
          <select
            value={page}
            onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
            className="ml-2 p-2 bg-gray-800 border border-white rounded text-white"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <option key={pageNum} value={pageNum}>
                {pageNum}
              </option>
            ))}
          </select>
          of {totalPages}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="mt-4">
        <label className="text-white">Page Size: </label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="ml-2 p-2 bg-gray-800 border border-white rounded text-white"
        >
          {[2, 5, 10].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DeviceTable;
