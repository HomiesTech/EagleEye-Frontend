import { useNavigate } from "react-router-dom";
import Device from "../../interface/Device.interface"
import SignalMeter from "./SignalMeter";

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  date += "Z";
  const formatted = new Date(date).toLocaleString('en-GB', options);
  return formatted.replace('/', '-').replace('/', '-').toLocaleUpperCase(); // Replacing the comma with "at" for better readability
}

const DeviceInfoTable = ({ device }: { device: Device }) => {
  const navigate = useNavigate();

  const handleShowAlarms = () => {
    navigate(`/monitor/enalarms?entityId=${device.deviceId}`);
  };

  // const handleShowGraphs = () => {
  //   navigate(`/monitor/graphs/${device.deviceId}`);
  // };
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Device Info */}
      <div className="p-4 border border-white rounded-lg">
        <h3 className="font-bold mb-2">Device Info</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Device Id:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.deviceId}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Device Name:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.deviceName}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                SSID:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.ssid}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Username:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.username}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                MAC Address:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.macAddress || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Created At:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {formatDate(device.createdAt)}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Updated At:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {formatDate(device.updatedAt)}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Sync At:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {formatDate(device.syncTime)}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Code Version:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {device.codeVersion ? device.codeVersion : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Power Save:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.powersave ? "True" : "False"}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Device millis:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.millis}</td>
            </tr>


            {/* alarm button  */}
            <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
              Alerts:
            </td>
            <td style={{ padding: "8px", border: "0px solid #ddd" }}>
              <button
                onClick={handleShowAlarms}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2">
               Show
              </button>
            </td>
          </tbody>
        </table>
      </div>


      {/* Connection Info */}
      <div className="p-4 border border-white rounded-lg">
        <h3 className="font-bold mb-2">Connection Info</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Boot Time:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {formatDate(device.bootTime)}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                IP Address:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{device.ipAddress || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Active:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>{
                device.activeState == 1 ?
                  <div className="w-10 h-10 rounded-lg bg-green-500 text-black flex items-center justify-center"></div>
                  : device.activeState == 2 ?
                    <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center"></div>
                    : device.activeState == 0 ?
                      <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center"></div>
                      : "N/A"
              }</td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Online:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {device.online ? "True" : "False"}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                WSS:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                <SignalMeter signalStrength={device.wifiSignalStrength} />
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Message Service Url Res Code:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {device.downloadMqttUrlResponseCode}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Boot Time Status Res Code:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {device.boot_status_code}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Message Publish Status:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                {device.message_publish_status ? "OK" : "Not OK"}
              </td>
            </tr>
            <tr>
              <td style={{width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd"}} >
                onlineInDb : 
                 </td>
                 <td  style={{ padding: "8px", border: "0px solid #ddd" }}>
                   {device.onlineInDb ? "True" : "False"}

                 </td>
            </tr>
            {/* <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                Graphs:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={handleShowGraphs}
                >
                  Show
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* Status Indicators */}
      <div className="p-4 border border-white rounded-lg">
        <h3 className="font-bold mb-2">Status Indicators</h3>

        {/* Grid with two rows */}
        <div className="grid grid-rows-2 gap-4">

          {/* First row: Appliance state indicators */}
          <div className="grid grid-cols-4 gap-2">
            {device.applianceState
              ? device.applianceState.split("").map((state, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${state === "1" ? "bg-green-500 text-black" : "bg-red-500"
                    }`}
                >
                  {index}
                </div>
              ))
              : Array(8)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-500"
                  >
                    {index}
                  </div>
                ))}
          </div>

          {/* Second row: Another table or status */}
          <div className="grid grid-cols-2 gap-2 mt-10">
            {/* Add your content here, for example, additional status indicators or data */}
            <div className="p-2 border border-gray-300 rounded-lg">
              <p className="font-bold mb-2">Flash Storage</p>
              <p>
                Used:{" "}
                {device.spiffs_used
                  ? `${((device.spiffs_used) / 1024).toFixed(2)} KB`
                  : "N/A"}
              </p>
              <p>
                Total:{" "}
                {device.spiffs_total
                  ? `${((device.spiffs_total) / 1024).toFixed(2)} KB`
                  : "N/A"}
              </p>
            </div>

            {/* NVS Entries */}
            <div className="p-2 border border-gray-300 rounded-lg">
              <p className="font-bold mb-2">NVS Entries</p>
              <p>
                Total:{" "}
                {device.nvs_total
                  ? device.nvs_total
                  : "N/A"}
              </p>
              <p>
                Used:{" "}
                {device.nvs_used
                  ? device.nvs_used
                  : "N/A"}
              </p>
              <p>
                Free:{" "}
                {device.nvs_free
                  ? device.nvs_free
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoTable;