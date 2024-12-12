import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeviceInfoTable from "./DeviceInfoTable";
import Device from "../../interface/Device.interface";

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
    const intervalId = setInterval(fetchDevice, 60000);
    return () => {
      clearInterval(intervalId);
    };
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
    <div className="bg-gray-900 text-white min-h-screen p-4">

      <DeviceInfoTable device={device} />


      {/* User Table */}
      <div className="p-4 border border-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Users</h3>
        </div>
        <table className="w-full border-collapse border border-white">
          <thead>
            <tr>
              <th className="border border-white px-4 py-2">User ID</th>
              <th className="border border-white px-4 py-2">SSID</th>
              <th className="border border-white px-4 py-2">Name</th>
              <th className="border border-white px-4 py-2">IP Address</th>
              <th className="border border-white px-4 py-2">Failures</th>
            </tr>
          </thead>
          <tbody>
            {device.deviceUsers && device.deviceUsers.length > 0 ? (
              device.deviceUsers.map((user, index) => (
                <tr key={index}>
                  <td className="border border-white px-4 py-2">
                    {user.userCode || "N/A"}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {device.ssid || "N/A"}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {user.name || "N/A"}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {user.userIpAddress || "N/A"}
                  </td>
                  <td className="border border-white px-4 py-2">
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
