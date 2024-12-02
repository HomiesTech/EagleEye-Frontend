import React, { useState } from "react";

const AddDevice: React.FC = () => {
  const [mac, setMac] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleAddDevice = () => {
    if (!mac || !ssid || !password) {
      setNotification("Please fill in all fields.");
      return;
    }

    // Mock device addition logic
    setNotification("Dev Added");
  };

  const handleClear = () => {
    setMac("");
    setSsid("");
    setPassword("");
    setNotification("");
  };

  return (
    <div className="flex justify-between p-6 bg-gray-700 text-white border border-white">
      {/* Form Section */}
      <div className="flex flex-col w-1/2 space-y-4">
        <div className="text-lg font-bold">Main &gt; Add Device</div>
        <div className="p-4 bg-gray-800 border border-white">
          <div className="mb-4 text-sm text-yellow-400">
            {notification || "<Dev Added / Dev Already Exists / Unexpected Error>"}
          </div>
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
              onChange={(e) => setSsid(e.target.value)}
            />
          </label>
          <label className="block mt-4">
            Password:
            <div className="relative">
              <input
                type="password"
                className="w-full mt-1 p-2 bg-gray-900 border border-white rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={handleAddDevice}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              Add
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

      {/* Currently Added Section */}
      <div className="w-1/2 p-4 bg-gray-800 border border-white">
        <div className="text-lg font-bold mb-4">Currently Added:</div>
        <div className="space-y-2">
          <div>DevId:</div>
          <div>MAC:</div>
          <div>SSID:</div>
          <div>Password:</div>
          <div>Dev Private Key: <span className="text-green-400">&lt;encrypted&gt;</span></div>
          <div>Dev Public Key: <span className="text-green-400">&lt;encrypted&gt;</span></div>
          <div>Server Private Key: <span className="text-green-400">&lt;encrypted&gt;</span></div>
          <div>Server Public Key: <span className="text-green-400">&lt;encrypted&gt;</span></div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
