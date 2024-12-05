import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Device {
  deviceId: number;
  ssid: string| null;
  downloadMqttUrlResponseCode:number;
  deviceName: string | null;
  syncTime:string | null;
  macAddress: string | null;
  ipAddress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  online: boolean;
  codeVersion: string | null;
  bootTime: string | null;
  activeState: number | null;
  applianceState: string | null;
  powersave: boolean | null;
  deviceUsers: Array<{
    customerId: number | null;
    name: string | null;
    userCode: string | null;
    userIpAddress: string | null;
    userFailureCount: string | null;
  }> | null;
}

const DevicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the device ID from URL params
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get<Device[]>(
          "https://service.homenetics.in/eagleeye/devices"
        );
        const selectedDevice = response.data.find(
          (d) => d.deviceId === parseInt(id || "0")
        );
        if (selectedDevice) {
          setDevice(selectedDevice);
        } else {
          setError("Device not found.");
        }
      } catch (err) {
        console.error("Error fetching device details:", err);
        setError("Failed to fetch device details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading device details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!device) {
    return <div className="text-red-500">Device not found.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
     

      {/* Device and Connection Info */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Device Info */}
        <div className="p-4 border border-gray-700 rounded-lg">
          <h3 className="font-bold mb-2">Device Info</h3>
          <p>Id: {device.deviceId}</p>
          <p>DeviceName:  {device.deviceName}</p>
          <p>Mac: {device.macAddress || "N/A"}</p>
          <p>IP: {device.ipAddress || "N/A"}</p>
          <p>Created At: {device.createdAt ? new Date(device.createdAt).toLocaleString() : "N/A"}</p>
          <p>Updated At: {device.updatedAt ? new Date(device.updatedAt).toLocaleString() : "N/A"}</p>
          <p>syncTime:  {device.syncTime}</p>
          <p>Code Version: {device.codeVersion || "N/A"}</p>
          <p>Appliance State: {device.applianceState || "N/A"}</p>
          <p>Online: {device.online ? "True" : "False"}</p>
        </div>

        {/* Connection Info */}
        <div className="p-4 border border-gray-700 rounded-lg">
          <h3 className="font-bold mb-2">Connection Info</h3>
          <p>Boot Time: {device.bootTime ? new Date(device.bootTime).toLocaleString() : "N/A"}</p>
          <p>Active State: {device.activeState || "N/A"}</p>
          <p>Powersave Mode: {device.powersave ? "True" : "False"}</p>
          <p>DownloadMqttUrlRequest: {device.downloadMqttUrlResponseCode ? "200" : "null"}</p>
        </div>

        {/* Status Indicators */}
        <div className="p-4 border border-gray-700 rounded-lg">
          <h3 className="font-bold mb-2">Status Indicators</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    index % 2 === 0 ? "bg-green-500 text-black" : "bg-red-500"
                  }`}
                >
                  {index}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="p-4 border border-gray-700 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Users</h3>
        </div>
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 px-4 py-2">User ID</th>
              <th className="border border-gray-700 px-4 py-2">SSID</th>
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">IP Address</th>
              <th className="border border-gray-700 px-4 py-2">Failures</th>
            </tr>
          </thead>
          <tbody>
            {device.deviceUsers && device.deviceUsers.length > 0 ? (
              device.deviceUsers.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.userCode || "N/A"}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {device.ssid || "N/A"}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.name || "N/A"}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.userIpAddress || "N/A"}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.userFailureCount || "0"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-700 px-4 py-2 text-center"
                  colSpan={4}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevicePage;
