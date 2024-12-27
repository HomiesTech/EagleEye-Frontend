import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

interface Alarm {
  severity: number;
  entityType: string | null;
  entityId: number | null;
  alarmKey: string | null;
  status: string | null;
  startTime: string | null;
  duration: number | null;
  detail?: string;
  lastUpdatedTime?: string;
}

const Alarms: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredAlarms, setFilteredAlarms] = useState<Alarm[]>([]);
  const [filterKeyField, setFilterKeyField] = useState<string>("key");
  const [filterKey, setFilterKey] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [hideFiltered, setHideFiltered] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const entityId = searchParams.get("entityId");
  const severityParam = searchParams.get("severity");
  const [popupAlarm, setPopupAlarm] = useState<Alarm | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {

    const fetchAlarms = async (currentPage:number,pageSize:number) => {
      try {
        const response = await axios.get(
          `http://172.16.0.10/eagleeye/alarms?page=${currentPage}&size=${pageSize}&sortFields=severity,startTime&sortOrders=desc,desc`
        );
        setAlarms(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching alarms:", err);
        setError("Failed to fetch alarms.");
        setLoading(false);
      }
    };
    fetchAlarms(currentPage,pageSize);
    const intervalId = setInterval(() => {
      fetchAlarms(currentPage,pageSize);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
    
  }, [currentPage, severityParam, pageSize]);

  useEffect(() => {
    if (entityId) {
      const filtered = alarms.filter((alarm) => alarm.entityId === parseInt(entityId));
      setFilteredAlarms(filtered);
    }
  }, [entityId, alarms]);

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
      const severityOrder = [4, 3, 2, 1];
      return severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity);
    });

    if (hideFiltered) {
      setFilteredAlarms(
        sortedAlarms.filter(alarm => !filteredAlarms.includes(alarm))
      );
    } else {
      setFilteredAlarms(
        sortedAlarms.filter(alarm => {
          const fieldValue = alarm[field as keyof Alarm];
          const statusValue = alarm.status || "";

          return (
            ((fieldValue || "").toString().toLowerCase().includes(key.toLowerCase()) || key === "") &&
            (statusValue.toLowerCase().includes(status.toLowerCase()) || status === "")
          );
        })
      );
    }
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
      minutes > 0 ? `${minutes}m` : "0 m",
      seconds > 0 ? `${seconds}s` : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const renderSeverityIcon = (severity: number) => {
    switch (severity) {
      case 1:
        return <span className="text-blue-500">&#9432;</span>;
      case 2:
        return <span className="text-green-500">&#128154;</span>;
      case 3:
        return <span className="text-yellow-500">⚠</span>;
      case 4:
        return <span className="text-red-500 text-2xl">&#8856;</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  const getRowClass = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-gradient-to-r from-blue-100 to-blue-400";
      case 2:
        return "bg-gradient-to-r from-green-100 to-green-400";
      case 3:
        return "bg-gradient-to-r from-yellow-100 to-yellow-400";
      case 4:
        return "bg-gradient-to-r from-red-100 to-red-400";
      default:
        return "";
    }
  };

  if (loading) return <div className="text-white">Loading alarms...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Alarms</h1>

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
              <option value="entityType">Name</option>
              <option value="entityId">ID</option>
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
        <div className="text-red-500">⊘ - Error</div>
      </div>

      <table className="w-full text-left border border-white">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="p-2 border text-center border-white"></th>
            <th className="p-2 border text-center border-white">Name</th>
            <th className="p-2 border text-center border-white">Key</th>
            <th className="p-2 border text-center border-white">Status</th>
            <th className="p-2 border text-center border-white">Start Time</th>
            <th className="p-2 border text-center border-white">Duration</th>
            <th className="p-2 border text-center border-white">Explore</th>
          </tr>
        </thead>
        <tbody>
          {(hideFiltered == false
            ? alarms.filter(alarm => !filteredAlarms.includes(alarm)).sort((a, b) => b.severity - a.severity)
            : filteredAlarms.sort((a, b) => b.severity - a.severity)
          ).map((alarm, index) => (
            <tr key={index} className={`${getRowClass(alarm.severity)} text-black font-semibold`}>
              <td className="p-2 border border-white">{renderSeverityIcon(alarm.severity)}</td>
              <td className="p-2 border border-white">
                {alarm.entityId ? (
                  <Link
                    to={`/monitor/device/${alarm.entityId}`}
                    className="text-black underline hover:text-white"
                  >
                    {`${alarm.entityType || "N/A"}=${alarm.entityId}`}
                  </Link>
                ) : (
                  <span>N/A</span>
                )}
              </td>
              <td className="p-2 border border-white">{alarm.alarmKey || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.status || "N/A"}</td>
              <td className="p-2 border border-white">{alarm.startTime ? new Date(alarm.startTime + "Z").toLocaleString() : "N/A"}</td>
              <td className="p-2 border border-white">{formatDuration(alarm.duration)}</td>
              <td className="p-2 border border-white">
                <button
                  onClick={() => setPopupAlarm(alarm)}
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Explore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-500"
        >
          Next
        </button>
        
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-2 bg-gray-900 border border-white rounded text-white"
        >
          {[10, 25, 50, 100].map(size => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      {popupAlarm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-white text-lg mb-2">Alarm Details</h2>
            <p className="text-white">Key: {popupAlarm.alarmKey || "N/A"}</p>
            <p className="text-white">Status: {popupAlarm.status || "N/A"}</p>
            <p className="text-white">Start Time: {popupAlarm.startTime || "N/A"}</p>
            <p className="text-white">Duration: {formatDuration(popupAlarm.duration)}</p>
            <p className="text-white">Detail: {popupAlarm.detail || "N/A"}</p>
            <p className="text-white">Last Updated Time: {popupAlarm.lastUpdatedTime || "N/A"}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPopupAlarm(null)}
                className="p-2 bg-gray-700 text-white rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarms;
