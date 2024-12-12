// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddDevice from "./component/AddDevice";
import ListDevice from "./component/Devices/ListDevice";
import Devices from "./component/Devices/Devices";
import DevicePage from "./component/Devices/DevicePage";
import Layout from "./layout/Layout"; // Import the new layout
import SignalStrength from "./component/Graph/WifiStrengthGraph";
import NvsStorage from "./component/Graph/NvsStorage";
import DeviceGraphs from "./component/Graph/GraphPage";
import Customers from "./component/Customer/Customers";
import Customerpage from "./component/Customer/Customerpage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/add-device" element={<AddDevice />} />
          <Route path="/list-device" element={<ListDevice />} />
          <Route path="/customer" element={<Customers />} /> {/*all the customer*/}
          <Route path="/devices" element={<Devices />} />
          <Route path="/customer/:id" element={<Customerpage />} />{/*single customer page */}
          <Route path="/device/:id" element={<DevicePage />} />
          <Route path="/signal-strength/:deviceId" element={<SignalStrength/>} />
          <Route path="/nvstorage/:deviceId" element={<NvsStorage/>} />
          <Route path="/graphs/:deviceId" element={<DeviceGraphs />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
