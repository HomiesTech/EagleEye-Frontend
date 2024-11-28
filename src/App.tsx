import React from "react";
import CONSTANTS from "./config/constant";

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen  mx-auto border-2 border-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b-2 border-white bg-black text-white">
        <div className="font-bold">EagleEye (Homenetics)</div>
        <div>
          <span className="mr-4">Version: {CONSTANTS.version}</span>
          <span>Date: &lt;DATE TIME IN UTC&gt;</span>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-4 bg-gray-900 text-white border-r border-white">
          <div className="mb-6">
            <div className="font-bold mb-2">Device Management</div>
            <ul className="space-y-2">
              <li>Add Device</li>
              <li>List Device</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Device Monitoring</div>
            <ul className="space-y-2">
              <li>Devices</li>
              <li>Customers</li>
              <li>Alerts</li>
              <li>Advisory</li>
              <li>History</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-800 text-white">
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
};

export default App;
