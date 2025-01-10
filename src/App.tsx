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
import Alarms from "./component/Alerts/Alerts";
import EntityAlerts from "./component/Alerts/EntityAlerts";
import Binary  from "./component/Binary-Generator/Binary";
import RestartESPPage from "./component/Command/restart";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/monitor/add-device" element={<AddDevice />} />
          <Route path="/monitor/alarms" element={<Alarms />} />
          <Route path="/monitor/enalarms" element={<EntityAlerts />} />
          <Route path="/monitor/entity/:id" element={<DevicePage />} /> {/*open devicepage with entityid */}
          <Route path="/monitor/list-device" element={<ListDevice />} />
          <Route path="/monitor/customer" element={<Customers />} /> {/*all the customer*/}
          <Route path="/monitor/devices" element={<Devices />} />
          <Route path="/monitor/customer/:id" element={<Customerpage />} />{/*single customer page */}
          <Route path="/monitor/device/:id" element={<DevicePage />} />
          <Route path="/monitor/signal-strength/:deviceId" element={<SignalStrength/>} />
          <Route path="/monitor/nvstorage/:deviceId" element={<NvsStorage/>} />
          <Route path="/monitor/graphs/:deviceId" element={<DeviceGraphs />} />
          <Route path="/generate" element={<Binary/>} />
          <Route path="/restart" element={<RestartESPPage/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
