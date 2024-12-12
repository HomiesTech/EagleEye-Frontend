import React from "react";

interface DeviceFilterProps {
  filters: { version: string; isConnected: string; demo: string };
  onFilterChange: (key: string, value: string) => void;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="ml-4">
      <label className="block mb-2">Filters:</label>
      <label>
        Version:
        <input
          type="text"
          className="p-1 ml-2 bg-gray-900 border border-white rounded text-white"
          value={filters.version}
          onChange={(e) => onFilterChange("version", e.target.value)}
        />
      </label>
      <label className="block mt-2">
        isConnected:
        <select
          className="p-1 ml-2 bg-gray-900 border border-white rounded text-white"
          value={filters.isConnected}
          onChange={(e) => onFilterChange("isConnected", e.target.value)}
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
          onChange={(e) => onFilterChange("demo", e.target.value)}
        >
          <option value="">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
    </div>
  );
};

export default DeviceFilter;
