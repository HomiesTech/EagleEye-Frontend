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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filteredAlarms, setFilteredAlarms] = useState<Alarm[]>([]);
  const [filterKeyField, setFilterKeyField] = useState<string>("key"); // Field to filter key
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

  const handleFilterKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterKey(event.target.value);
    filterAlarms(filterKeyField, event.target.value, filterStatus);
  };

  const handleFilterKeyFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterKeyField(event.target.value);
    filterAlarms(event.target.value, filterKey, filterStatus);
  };

  const handleFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
    filterAlarms(filterKeyField, filterKey, event.target.value);
  };

  const toggleHideFiltered = () => {
    setHideFiltered(!hideFiltered);
  };

  const filterAlarms = (field: string, key: string, status: string) => {
    const sortedAlarms = alarms.sort((a, b) => {
      const severityOrder = [4, 3, 2, 1]; // Error -> Warn -> Ok -> Info
      return severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity);
    });
    setFilteredAlarms(
      sortedAlarms.filter((alarm) =>
        ((alarm[field as keyof Alarm] || "").toString().toLowerCase().includes(key.toLowerCase()) || key === "") &&
        ((alarm.status || "").toLowerCase().includes(status.toLowerCase()) || status === "")
      )
    );
  };

  const formatDuration = (duration: number | null): string => {
    if (duration === null || duration < 0) return "N/A";

    const days = Math.floor(duration / (24 * 3600));
    const hours = Math.floor((duration % (24 * 3600)) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return [
      days > 0 ? `${days}d` : "",
      hours > 0 ? `${hours}h` : "",
      minutes > 0 ? `${minutes}m` : "",
      seconds > 0 ? `${seconds}s` : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const renderSeverityIcon = (severity: number) => {
    switch (severity) {
      case 1:
        return <span className="text-blue-500">&#9432;</span>; // Blue circle with "i"
      case 2:
        return <span className="text-green-500">&#128154;</span>; // Green star
      case 3:
        return <span className="text-yellow-500">⚠ </span>; // Yellow warning triangle
      case 4:
        return <span className="text-red-500">&#128128;</span>; // Red exclamation mark
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  const getRowClass = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-gradient-to-r from-blue-100 to-blue-500";
      case 2:
        return "bg-gradient-to-r from-green-100 to-green-500";
      case 3:
        return "bg-gradient-to-r from-yellow-100 to-yellow-500";
      case 4:
        return "bg-gradient-to-r from-red-100 to-red-500";
      default:
        return "";
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

      {/* Filter Section */}
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <div className="flex w-1/2 gap-2">
            <select
              value={filterKeyField}
              onChange={handleFilterKeyFieldChange}
              className="p-2 bg-gray-900 border border-white rounded text-white"
            >
              <option value="key">Key</option>
              <option value="status">Status</option>
              <option value="entityType">Entity Type</option>
              <option value="entityId">Entity ID</option>
            </select>
            <input
              type="text"
              placeholder={`Filter by ${filterKeyField}`}
              value={filterKey}
              onChange={handleFilterKey}
              className="p-2 bg-gray-900 border border-white rounded text-white flex-1"
            />
          </div>
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
      <div className="bg-gray-900 border border-white p-2 mb-5 w-max h-auto">
        <div className="text-blue-400">Ⓘ - Info</div>
        <div className="text-green-500">💚 - OK</div>
        <div className="text-yellow-300">⚠ - Warn</div>
        <div className="text-red-500">💀 - Error</div>
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
          {(!hideFiltered
            ? filteredAlarms.sort((a, b) => b.severity - a.severity)
            : alarms.filter((alarm) => !filteredAlarms.includes(alarm)).sort((a, b) => b.severity - a.severity)
          ).map((alarm, index) => (
            <tr key={index} className={`${getRowClass(alarm.severity)} text-black`}>
              <td className="p-2 border border-white">{renderSeverityIcon(alarm.severity)}</td>
              <td className="p-2 border border-white">{alarm.entityType || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.entityId || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.key || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.status || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.startTime ? new Date(alarm.startTime + "Z").toLocaleString() : "N/A"}</td>
              <td className="p-2 border border-white">{formatDuration(alarm.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alarms;
