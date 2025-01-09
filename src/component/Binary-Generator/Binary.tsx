import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import CONSTANTS from "../../config/constant";

const Binary = () => {
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("0");
  const [responseText, setResponseText] = useState<string>("");

  useEffect(() => {
    console.log("useEffect triggered on component mount");

    const fetchVersions = async () => {
        try {
          console.log("Fetching versions...");
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

      if (response.status === 200) {
        const text = response.data; // Assuming the response is text
        setResponseText(text); // Display response text on the screen
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setResponseText("Failed to fetch response. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Dropdown to select a version */}
      <label htmlFor="version-select">Select a version:</label>
      <select
        id="version-select"
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(e.target.value)}
      >
        <option value="">--Select a version--</option>
        {versions.map((version, index) => (
          <option key={index} value={version}>
            {version}
          </option>
        ))}
      </select>

      {/* Input for device ID */}
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="device-id">Device ID:</label>
        <input
          type="text"
          id="device-id"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="Enter Device ID"
          style={{color: "black"}}
        />
      </div>

      {/* Submit button */}
      <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
        Submit
      </button>

      {/* Display the API response */}
      {responseText && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {responseText}
        </div>
      )}
    </div>
  );
};

export default Binary;
