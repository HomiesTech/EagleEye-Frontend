import React, { useState } from "react";

const Customer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ version: "", isConnected: "", demo: "" });

  const devices = [
    {
      devId: "12345",
      ssid: "DeviceSSID",
      mac: "00:1A:2B:3C:4D:5E",
      version: "1.0.0",
      connected: true,
      demo: false,
      warnings: 2,
      errors: 0,
    },
    {
      devId: "67890",
      ssid: "AnotherSSID",
      mac: "11:22:33:44:55:66",
      version: "1.1.0",
      connected: false,
      demo: true,
      warnings: 1,
      errors: 1,
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.devId.includes(searchQuery) &&
      (!filters.version || device.version === filters.version) &&
      (!filters.isConnected || String(device.connected) === filters.isConnected) &&
      (!filters.demo || String(device.demo) === filters.demo)
  );

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Customer</h1>

      {/* Customer Details */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gray-900 border border-white">
          <h2 className="font-bold">Id:</h2>
          <p>Code:</p>
          <p>Name:</p>
          <p>Created At:</p>
          <p>Updated At:</p>
          <p>Devices:</p>
        </div>
        <div className="p-4 bg-gray-900 border border-white">
          <h2 className="font-bold">Devices:</h2>
          <p>Active:</p>
          <p>Inactive:</p>
          <p>Connected:</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 p-2 bg-gray-900 border border-white rounded text-white"
        />
        <div className="ml-4">
          <label className="block mb-2">Filters:</label>
          <label>
            Version:
            <input
              type="text"
              className="p-1 ml-2 bg-gray-900 border border-white rounded text-white"
              value={filters.version}
              onChange={(e) => handleFilterChange("version", e.target.value)}
            />
          </label>
          <label className="block mt-2">
            isConnected:
            <select
              className="p-1 ml-2 bg-gray-900 border border-white rounded text-white"
              value={filters.isConnected}
              onChange={(e) => handleFilterChange("isConnected", e.target.value)}
            >
              <option value="">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <label className="block mt-2">
            Demo:
            <select
              className="p-1 ml-2 bg-gray-900 border border-white rounded text-white"
              value={filters.demo}
              onChange={(e) => handleFilterChange("demo", e.target.value)}
            >
              <option value="">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        </div>
      </div>

      {/* Device Table */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">DevId</th>
            <th className="p-2 border border-white">SSID</th>
            <th className="p-2 border border-white">MAC</th>
            <th className="p-2 border border-white">Version</th>
            <th className="p-2 border border-white">Connected</th>
            <th className="p-2 border border-white">Demo</th>
            <th className="p-2 border border-white">Warnings</th>
            <th className="p-2 border border-white">Errors</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.devId} className="text-white">
              <td className="p-2 border border-white">{device.devId}</td>
              <td className="p-2 border border-white">{device.ssid}</td>
              <td className="p-2 border border-white">{device.mac}</td>
              <td className="p-2 border border-white">{device.version}</td>
              <td className="p-2 border border-white">{device.connected ? "Yes" : "No"}</td>
              <td className="p-2 border border-white">{device.demo ? "Yes" : "No"}</td>
              <td className="p-2 border border-white">{device.warnings}</td>
              <td className="p-2 border border-white">{device.errors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
