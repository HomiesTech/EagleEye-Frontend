import React, { useState, useEffect } from "react";
import axios from "axios";

// Interface definition with required fields
interface Alarm {
  severity: number;
  entityType: string | null;
  entityId: number | null;
  key: string | null;
  status: string | null;
  startTime: string | null;
  duration: number | null;
}

const Alarms: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]); // State to store alarms from API
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filteredAlarms, setFilteredAlarms] = useState<Alarm[]>([]);
  const [filterKey, setFilterKey] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [hideFiltered, setHideFiltered] = useState<boolean>(false);

  // Fetch alarms from API
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await axios.get<Alarm[]>("https://service.homenetics.in/eagleeye/alarms");
        setAlarms(response.data); // Save data from API to state
        setFilteredAlarms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching alarms:", err);
        setError("Failed to fetch alarms.");
        setLoading(false);
      }
    };

    fetchAlarms();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    filterAlarms(event.target.value, filterKey, filterStatus);
  };

  const handleFilterKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterKey(event.target.value);
    filterAlarms(searchQuery, event.target.value, filterStatus);
  };

  const handleFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
    filterAlarms(searchQuery, filterKey, event.target.value);
  };

  const toggleHideFiltered = () => {
    setHideFiltered(!hideFiltered);
  };

  const filterAlarms = (query: string, key: string, status: string) => {
    setFilteredAlarms(
      alarms.filter((alarm) =>
        ((alarm.key || "").toLowerCase().includes(key.toLowerCase()) || key === "") &&
        ((alarm.status || "").toLowerCase().includes(status.toLowerCase()) || status === "") &&
        ((alarm.key || "").toLowerCase().includes(query.toLowerCase()) ||
          (alarm.status || "").toLowerCase().includes(query.toLowerCase()) ||
          (alarm.entityType || "").toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const renderSeverityIcon = (severity: number) => {
    switch (severity) {
      case 1:
        return <span className="text-blue-500">&#9432;</span>; // Blue circle with "i"
      case 2:
        return <span className="text-green-500">★</span>; // Green star
      case 3:
        return <span className="text-yellow-500">⚠ </span>; // Yellow warning triangle
      case 4:
        return <span className="text-red-500">&#9888;</span>; // Red exclamation mark
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  if (loading) {
    return <div className="text-white">Loading alarms...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Alarms</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Key, Status, or Entity..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-900 border border-white rounded text-white mb-2"
        />

        {/* Filter Box */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by Key"
            value={filterKey}
            onChange={handleFilterKey}
            className="p-2 bg-gray-900 border border-white rounded text-white w-1/2"
          />
          <input
            type="text"
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={handleFilterStatus}
            className="p-2 bg-gray-900 border border-white rounded text-white w-1/2"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={hideFiltered}
            onChange={toggleHideFiltered}
            className="mr-2"
          />
          <label className="text-white">Hide</label>
        </div>
      </div>

      {/* Alarm List */}
      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2 border border-white"></th>
            <th className="p-2 border border-white">Entity</th>
            <th className="p-2 border border-white">Entity ID</th>
            <th className="p-2 border border-white">Key</th>
            <th className="p-2 border border-white">Status</th>
            <th className="p-2 border border-white">Start Time</th>
            <th className="p-2 border border-white">Duration</th>
          </tr>
        </thead>
        <tbody>
          {(!hideFiltered ? filteredAlarms : alarms.filter(alarm => !filteredAlarms.includes(alarm))).map((alarm, index) => (
            <tr key={index} className="text-white">
              <td className="p-2 border border-white">{renderSeverityIcon(alarm.severity)}</td>
              <td className="p-2 border border-white">{alarm.entityType || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.entityId || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.key || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.status || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.startTime ? new Date(alarm.startTime).toLocaleString() : "N/A"}</td>
              <td className="p-2 border border-white">{alarm.duration || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alarms;
