import React, { useEffect, useState } from "react";
import axios from "axios";

interface DeviceResponse {
  device: {
    devId: number;
    macAddress: string;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
    lastConnectionAt: string | null;
  };
  deviceCred: {
    credId: number;
    devId: number;
    def_dev_ssid: string;
    def_dev_password: string;
    mqtt_password: string;
    createdAt: string;
    updatedAt: string;
    syncAt: string;
  };
}

const AddDevice: React.FC = () => {
  const [mac, setMac] = useState("");
  const [ssid, setSsid] = useState("");
  const password = "homus123"; // Hardcoded password
  const [notification, setNotification] = useState("");
  const [deviceData, setDeviceData] = useState<DeviceResponse | null>(null);

  // Fetch SSID on component mount
  useEffect(() => {
    axios
      .get<{ ssid: string }>("https://monitor.homenetics.in:34000/get_new_device_ssid")
      .then((response) => {
        setSsid(response.data.ssid || "Unknown SSID");
      })
      .catch(() => {
        setNotification("Error fetching SSID");
      });
  }, []);

  const handleAddDevice = () => {
    if (!mac) {
      setNotification("Please enter a MAC address.");
      return;
    }

    const requestData = {
      macAddress: mac,
      ssid,
      password,
      mqttpassword: "mqttpassword", // Replace with real mqtt password
    };

    axios
      .post<DeviceResponse>(
        "https://service.homenetics.in/database/api/devices",
        requestData
      )
      .then((response) => {
        setDeviceData(response.data);
        setNotification("Device added successfully.");
        setMac("");
        setSsid("");
        setNotification("");
        axios
      .get<{ ssid: string }>("https://monitor.homenetics.in:34000/get_new_device_ssid")
      .then((response) => {
        setSsid(response.data.ssid || "Unknown SSID");
      })
      .catch(() => {
        setNotification("Error fetching SSID");
      });
      })
      .catch((error) => {
        setNotification(
          error.response?.data?.message || "Unexpected error occurred."
        );
      });
  };

  const handleClear = () => {
    setMac("");
    setNotification("");
  };

  const handleDelete = (deviceId: number) => {
    axios
      .delete<{ message: string }>(
        `https://service.homenetics.in/database/api/devices/${deviceId}`
      )
      .then(() => {
        setDeviceData(null);
        setNotification("Device deleted successfully.");
      })
      .catch(() => {
        setNotification("Error deleting the device.");
      });
  };

  const formatDateToIST = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(date);
  };

  return (
    <div className="flex justify-between p-6 bg-gray-700 text-white border border-white">
      {/* Form Section */}
      <div className="flex flex-col w-1/2 space-y-4">
        <div className="text-lg font-bold">Main &gt; Add Device</div>
        <div className="p-4 bg-gray-800 border border-white">
          <div className="mb-4 text-sm text-yellow-400">{notification}</div>
          <label className="block">
            MAC:
            <input
              type="text"
              className="w-full mt-1 p-2 bg-gray-900 border border-white rounded"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
            />
          </label>
          <label className="block mt-4">
            SSID:
            <input
              type="text"
              className="w-full mt-1 p-2 bg-gray-900 border border-white rounded"
              value={ssid}
              disabled
            />
          </label>
          <label className="block mt-4">
            Password:
            <input
              type="password"
              className="w-full mt-1 p-2 bg-gray-900 border border-white rounded"
              value={password}
              disabled
            />
          </label>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={handleAddDevice}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Response Display Section */}
      <div className="w-1/2 p-4 bg-gray-800 border border-white">
        <div className="text-lg font-bold mb-4">Device Information</div>
        {deviceData ? (
          <div className="space-y-2">
            <div><strong>Device ID:</strong> {deviceData.device.devId}</div>
            <div><strong>MAC Address:</strong> {deviceData.device.macAddress}</div>
            <div>
              <strong>Last Connection:</strong>{" "}
              {formatDateToIST(deviceData.device.lastConnectionAt)}
            </div>
            <div><strong>Created At:</strong> {formatDateToIST(deviceData.device.createdAt)}</div>
            <div><strong>Updated At:</strong> {formatDateToIST(deviceData.device.updatedAt)}</div>
            <div><strong>SSID:</strong> {deviceData.deviceCred.def_dev_ssid}</div>
            <div><strong>Password:</strong> {deviceData.deviceCred.def_dev_password}</div>
            <div><strong>MQTT Password:</strong> {deviceData.deviceCred.mqtt_password}</div>
            <div>
              <strong>Credentials Created At:</strong>{" "}
              {formatDateToIST(deviceData.deviceCred.createdAt)}
            </div>
            <div>
              <strong>Credentials Updated At:</strong>{" "}
              {formatDateToIST(deviceData.deviceCred.updatedAt)}
            </div>
            <div><strong>Sync At:</strong> {formatDateToIST(deviceData.deviceCred.syncAt)}</div>
            <button
              onClick={() => handleDelete(deviceData.device.devId)}
              className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ) : (
          <div>No device information available.</div>
        )}
      </div>
    </div>
  );
};

export default AddDevice;