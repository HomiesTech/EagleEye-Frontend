import React, { useState, useEffect } from "react";
import axios from "axios";

// Define Device interface
interface Device {
  deviceId: number;
  ssid: string | null;
  macAddress: string | null;
  ipAddress: string | null;
  activeState: number;
  codeVersion: string | null;
}

const DeviceTable: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]); // API device list
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null); // Selected device for detailed view
  const [password, setPassword] = useState(""); // Password for popup
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
        setDevices(response.data); // Set the devices from API
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

  const handleView = (device: Device) => {
    setSelectedDevice(device);
  };

  const handlePasswordSubmit = () => {
    if (password === "correctPassword") {
      alert(`Decrypted data for device: ${JSON.stringify(selectedDevice, null, 2)}`);
      setSelectedDevice(null);
    } else {
      alert("Incorrect password.");
    }
  };

  const handleDelete = (id: number) => {
    setDevices(devices.filter((device) => device.deviceId !== id));
  };

  // Filter devices based on search query
  const filteredDevices = devices.filter((device) =>
    device.deviceId.toString().includes(searchQuery.toLowerCase())
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
          placeholder="Search id ..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>
      {/*total devices info */}
      <div className="mb-4 text-white font-bold">
        Total Devices: {filteredDevices.length}
         </div>

      {/* Device Table */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">S.NO</th>
            <th className="p-2 border border-white">ID</th>
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">Mac Address</th>
            <th className="p-2 border border-white">Controls</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={device.deviceId} className="text-white">
              <td className="p-2 border border-white">{index + 1}</td> {/* S.No Column */}
              <td className="p-2 border border-white">{device.deviceId}</td>
              <td className="p-2 border border-white">{device.ssid || "N/A"}</td>
              <td className="p-2 border border-white">{device.macAddress || "N/A"}</td>
              <td className="p-2 border border-white">
                <button
                  onClick={() => handleView(device)}
                  className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(device.deviceId)}
                  className="ml-2 px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Popup */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 bg-gray-900 text-white border border-white rounded w-1/2">
            <h2 className="text-lg font-bold mb-4">Controls (View)</h2>
            <div>
              <p>DevId: {selectedDevice.deviceId}</p>
              <p>MAC: {selectedDevice.macAddress}</p>
              <p>SSID: {selectedDevice.ssid}</p>
              <p>Password: &lt;encrypted&gt;</p>
              <p>Dev Private Key: &lt;encrypted&gt;</p>
              <p>Dev Public Key: &lt;encrypted&gt;</p>
              <p>Server Private Key: &lt;encrypted&gt;</p>
              <p>Server Public Key: &lt;encrypted&gt;</p>
              <p>Created At: N/A</p>
              <p>Created By: N/A</p>
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="p-2 bg-gray-800 border border-white rounded text-white w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handlePasswordSubmit}
                className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500"
              >
                Submit
              </button>
            </div>
            <button
              onClick={() => setSelectedDevice(null)}
              className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceTable;
              
           
