import Device from "../interface/Device.interface";
import SignalMeter from "./SignalMeter";

const formatDate = (date:string | null) => {
    if (!date) return "N/A";
    const options:Intl.DateTimeFormatOptions = {
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
    return formatted.replace('/','-').replace('/', '-').toLocaleUpperCase(); // Replacing the comma with "at" for better readability
}

const DeviceInfoTable = ({ device }: { device: Device }) => {
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
                {device.online ? "Yes" : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ width: "150px", fontWeight: "bold", padding: "8px", border: "0px solid #ddd" }}>
                WSS:
              </td>
              <td style={{ padding: "8px", border: "0px solid #ddd" }}>
                <SignalMeter signalStrength={device.signalStrength} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Status Indicators */}
      <div className="p-4 border border-white rounded-lg">
        <h3 className="font-bold mb-2">Status Indicators</h3>
        <div className="grid grid-cols-4 gap-2">
          {device.applianceState
            ? device.applianceState.split("").map((state, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    state === "1" ? "bg-green-500 text-black" : "bg-red-500"
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
      </div>
    </div>
  );
};

export default DeviceInfoTable;
