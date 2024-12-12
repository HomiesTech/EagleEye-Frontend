import React from "react";

interface Device {
  devId: string;
  ssid: string;
  mac: string;
  version: string;
  connected: boolean;
  demo: boolean;
  warnings: number;
  errors: number;
}

interface DeviceTableProps {
  devices: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  return (
    <table className="w-full mt-10 text-left border border-white">
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
        {devices.map((device) => (
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
  );
};

export default DeviceTable;
