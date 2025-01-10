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
        const text = response.data; // Assuming the response is text
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
    <div className="p-5">
      {/* Dropdown to select a version */}
      <label htmlFor="version-select" className="block mb-2">
        Select a version:
      </label>
      <select
        id="version-select"
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      >
        <option value="">--Select a version--</option>
        {versions.map((version, index) => (
          <option key={index} value={version}>
            {version}
          </option>
        ))}
      </select>

      {/* Input for device ID */}
      <div className="mt-4">
        <label htmlFor="device-id" className="block mb-2">
          Device ID:
        </label>
        <input
          type="text"
          id="device-id"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="Enter Device ID"
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      {/* Submit button */}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Loader (while loading data) */}
      {loading && (
        <div className="mt-4 text-center">
          <div className="loader">Loading...</div> {/* Replace this with any loading spinner or animation */}
        </div>
      )}

      {/* Display the API response */}
      {responseText && (
        <div
          className="mt-5 bg-white text-black p-4 rounded-md whitespace-pre-wrap"
          style={{
            whiteSpace: "pre-wrap",
            maxHeight: "300px", // You can adjust this height as needed
            overflowY: "auto", // Enables vertical scrolling
          }}
        >
          {responseText}
        </div>
      )}
    </div>
  );
};

export default Binary;
