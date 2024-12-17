import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Interface definition with required fields
interface Customer {
  id: number;
  name: string | null;
  email: string | null;
  mobile: string | null;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]); // State to store customers from API
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get<Customer[]>("https://service.homenetics.in/eagleeye/customers");
        setCustomers(response.data); // Save data from API to state
        setFilteredCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilteredCustomers(
      customers.filter((customer) =>
        (customer.name || "").toLowerCase().includes(event.target.value.toLowerCase()) ||
        (customer.email || "").toLowerCase().includes(event.target.value.toLowerCase()) ||
        (customer.mobile || "").includes(event.target.value)
      )
    );
  };

  if (loading) {
    return <div className="text-white">Loading customers...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Customers</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Mobile..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white"
        />
      </div>

      {/* Customer List */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white">ID</th>
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">Email</th>
            <th className="p-2 border border-white">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="text-white">
              <td className="p-2 border border-white">
                <Link to={`/monitor/customer/${customer.id}`} className="text-white-500 hover:underline">
                  {customer.id}
                </Link>
              </td>
              <td className="p-2 border border-white">{customer.name || "N/A"}</td>
              <td className="p-2 border border-white">{customer.email || "N/A"}</td>
              <td className="p-2 border border-white">{customer.mobile || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
