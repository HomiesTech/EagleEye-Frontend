import React, { useState } from "react";

const ListDevice: React.FC = () => {
  const [devices, setDevices] = useState([
    // Example device data
    { devId: "12345", mac: "00:1A:2B:3C:4D:5E", ssid: "DeviceSSID", createdAt: "2024-12-02", createdBy: "Admin" },
    { devId: "67890", mac: "11:22:33:44:55:66", ssid: "AnotherSSID", createdAt: "2024-12-01", createdBy: "User" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<any | null>(null);
  const [password, setPassword] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleView = (device: any) => {
    setSelectedDevice(device);
  };

  const handleDelete = (devId: string) => {
    setDevices(devices.filter((device) => device.devId !== devId));
  };

  const handlePasswordSubmit = () => {
    // Simulate decryption logic
    if (password === "correctPassword") {
      alert("Decrypted data: \n" + JSON.stringify(selectedDevice, null, 2));
      setSelectedDevice(null);
    } else {
      alert("Incorrect password.");
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.devId.includes(searchQuery) || device.mac.includes(searchQuery)
  );

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Main &gt; List Devices</h1>
      {/* Search Bar */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>

      {/* Device Table */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">DevId</th>
            <th className="p-2 border border-white">MAC</th>
            <th className="p-2 border border-white">SSID</th>
            <th className="p-2 border border-white">CreatedAt</th>
            <th className="p-2 border border-white">CreatedBy</th>
            <th className="p-2 border border-white">Controls</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.devId} className="text-white">
              <td className="p-2 border border-white">{device.devId}</td>
              <td className="p-2 border border-white">{device.mac}</td>
              <td className="p-2 border border-white">{device.ssid}</td>
              <td className="p-2 border border-white">{device.createdAt}</td>
              <td className="p-2 border border-white">{device.createdBy}</td>
              <td className="p-2 border border-white flex space-x-2">
                <button
                  onClick={() => handleView(device)}
                  className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(device.devId)}
                  className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 text-white">
        <span>1</span> ... <span>100</span>
      </div>

      {/* View Popup */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 bg-gray-900 text-white border border-white rounded w-1/2">
            <h2 className="text-lg font-bold mb-4">Controls (View)</h2>
            <div>
              <p>DevId: {selectedDevice.devId}</p>
              <p>MAC: {selectedDevice.mac}</p>
              <p>SSID: {selectedDevice.ssid}</p>
              <p>Password: &lt;encrypted&gt;</p>
              <p>Dev Private Key: &lt;encrypted&gt;</p>
              <p>Dev Public Key: &lt;encrypted&gt;</p>
              <p>Server Private Key: &lt;encrypted&gt;</p>
              <p>Server Public Key: &lt;encrypted&gt;</p>
              <p>Created At: {selectedDevice.createdAt}</p>
              <p>Created By: {selectedDevice.createdBy}</p>
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

export default ListDevice;
