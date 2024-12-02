import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddDevice from "./component/AddDevice"; // AddDevice Component
import ListDevice from "./component/ListDevice"; // Create this component
import CONSTANTS from "./config/constant";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen mx-auto border-2 border-white">
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
                <li>
                  <Link to="/add-device" className="hover:underline">
                    Add Device
                  </Link>
                </li>
                <li>
                  <Link to="/list-device" className="hover:underline">
                    List Device
                  </Link>
                </li>
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
            <Routes>
              <Route path="/add-device" element={<AddDevice />} />
              <Route path="/list-device" element={<ListDevice />} />
              {/* Other Routes */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
