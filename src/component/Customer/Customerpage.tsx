import React, { useEffect, useState } from "react";
import CustomerDetailsBox from "./CustomerDetailsBox";
import DeviceFilter from "./DeviceFilter";
import DeviceTable from "./DeviceTable";

const Customerpage: React.FC = () => {
  const [filters, setFilters] = useState({ version: "", isConnected: "", demo: "" });
  const [customerData, setCustomerData] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("https://service.homenetics.in/eagleeye/customers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Handle missing fields by setting them to "NA"
        const processedData = {
          ...data,
          id: data.id || "NA",
          code: data.code || "NA",
          name: data.name || "NA",
          createdAt: data.createdAt || "NA",
          updatedAt: data.updatedAt || "NA",
          devices: data.devices || [],
        };

        setCustomerData(processedData);
        setDevices(processedData.devices);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);


  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredDevices = devices.filter(
    (device) =>
      (!filters.version || device.version === filters.version) &&
      (!filters.isConnected || String(device.connected) === filters.isConnected) &&
      (!filters.demo || String(device.demo) === filters.demo)
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customerData) {
    return <div>Error loading data.</div>;
  }
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Customer</h1>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <CustomerDetailsBox
          title="Customer Details"
          details={{
            Id: "12345",
            Code: "ABC123",
            Name: "John Doe",
            "Created At": "2023-01-01",
            "Updated At": "2024-01-01",
            Devices: 10,
          }}
        />
        <CustomerDetailsBox
          title="Device Summary"
          details={{
            Active: 5,
            Inactive: 6,
            Connected: 3,
          }}
        />
      </div>

      <DeviceFilter filters={filters} onFilterChange={handleFilterChange} />

      <DeviceTable devices={filteredDevices} />
    </div>
  );
};

export default Customerpage;
