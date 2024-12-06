// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddDevice from "./component/AddDevice";
import ListDevice from "./component/ListDevice";
import Customer from "./component/Customer";
import Devices from "./component/Devices";
import DevicePage from "./component/DevicePage";
import Layout from "./layout/Layout"; // Import the new layout

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/add-device" element={<AddDevice />} />
          <Route path="/list-device" element={<ListDevice />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device/:id" element={<DevicePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
