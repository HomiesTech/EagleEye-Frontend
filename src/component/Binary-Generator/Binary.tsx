import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import CONSTANTS from "../../config/constant";

const Binary = () => {
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("0");
  const [responseText, setResponseText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    console.log("useEffect triggered on component mount");

    const fetchVersions = async () => {
      try {
        console.log("Fetching versions...");
        setLoading(true); // Set loading to true while fetching
        const response = await fetch(CONSTANTS.deviceVersionApi);
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch versions");
        }
        const data = await response.json();
        if (data?.versions) {
          console.log("Versions fetched:", data.versions);
          setVersions(data.versions);
        }
      } catch (error) {
        console.log("Error fetching versions:", error);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchVersions();
  }, []); // Empty dependency array ensures it runs only once

  const handleSubmit = async () => {
    if (!selectedVersion || !deviceId) {
      alert("Please select a version and enter a device ID.");
      return;
    }

    try {
      setLoading(true); // Set loading to true when submitting the form
      const response = await axios.post(
        CONSTANTS.binaryGeneratorApi, // Replace with your POST API endpoint
        {
          version: selectedVersion,
          device_id: deviceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status) {
        const text = response.data as string; // Assuming the response is text
        setResponseText(text); // Display response text on the screen
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setResponseText("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Dropdown to select a version */}
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <label htmlFor="version-select" className=" text-lg ">
            Select a version:
          </label>
          <select
            id="version-select"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="  border pl-3 border-gray-300 rounded-md text-black h-8"
          >
            <option value="">--Select a version--</option>
            {versions.map((version, index) => (
              <option key={index} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        {/* Input for device ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <label htmlFor="device-id" className="block text-lg mb-2">
            Device ID:
          </label>
          <input
            type="text"
            id="device-id"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="Enter Device ID"
            className="w-full pl-3 border border-gray-300 rounded-md text-black h-8"
          />
        </div>
     

      {/* Submit button */}
      {!loading && (
        <div className=" w-full">
        <button
          className="px-10  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-auto  mr-6 h-8 block"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      )}
       </div>

      {/* Loader (while loading data) */}
      {loading && (
        <div className="mt-4 text-center">
          <div className="loader text-xl">Loading...</div> {/* Replace this with any loading spinner or animation */}
        </div>
      )}

      {/* Display the API response */}
      {!loading && responseText && (
        <div
          className="mt-5 bg-white text-black p-4 rounded-md shadow-lg whitespace-pre-wrap min-h-96 max-h-[500px] overflow-y-auto"
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {responseText}
        </div>
      )}
    </div>
  );
};

export default Binary;
