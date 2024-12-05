// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// interface DeviceDetailProps {
//   deviceId: number;
//   deviceName: string | null;
//   macAddress: string | null;
//   ipAddress: string | null;
//   createdAt: string;
//   updatedAt: string;
//   online: boolean;
//   codeVersion: string | null;
//   activeState: number;
//   applianceState: string | null;
//   wifiSignalStrength: { strength: number; time: string }[];
// }

// const DeviceDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Extract the device ID from the URL
//   const [device, setDevice] = useState<DeviceDetailProps | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDevice = async () => {
//       try {
//         const response = await axios.get<DeviceDetailProps[]>(
//           `https://service.homenetics.in/eagleeye/devices`
//         );

//         const foundDevice = response.data.find(
//           (d) => d.deviceId === parseInt(id || "0")
//         );

//         if (foundDevice) {
//           setDevice(foundDevice);
//         } else {
//           setError("Device not found");
//         }
//       } catch (err) {
//         console.error("Error fetching device details:", err);
//         setError("Failed to fetch device details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDevice();
//   }, [id]);

//   if (loading) {
//     return <div className="text-white">Loading device details...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (!device) {
//     return <div className="text-red-500">Device not found</div>;
//   }

//   return (
//     <div className="text-white">
//       <h1 className="text-lg font-bold mb-4">Device Details</h1>
//       <div className="mb-4">
//         <Link to="/" className="text-blue-500 hover:underline">
//           Back to Devices
//         </Link>
//       </div>

//       <div className="p-4 border border-white rounded">
//         <h2 className="font-bold text-xl">{device.deviceName || "N/A"}</h2>
//         <p>Device ID: {device.deviceId}</p>
//         <p>MAC Address: {device.macAddress || "N/A"}</p>
//         <p>IP Address: {device.ipAddress || "N/A"}</p>
//         <p>
//           Status:{" "}
//           <span className={device.online ? "text-green-500" : "text-red-500"}>
//             {device.online ? "Online" : "Offline"}
//           </span>
//         </p>
//         <p>Code Version: {device.codeVersion || "N/A"}</p>
//         <p>Created At: {new Date(device.createdAt).toLocaleString()}</p>
//         <p>Updated At: {new Date(device.updatedAt).toLocaleString()}</p>
//         <p>Active State: {device.activeState === 1 ? "Active" : "Inactive"}</p>
//         <p>Appliance State: {device.applianceState || "N/A"}</p>
//       </div>

//       {device.wifiSignalStrength.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-bold mb-2">WiFi Signal Strength</h3>
//           <ul className="list-disc pl-4">
//             {device.wifiSignalStrength.map((signal, index) => (
//               <li key={index}>
//                 Strength: {signal.strength}, Time:{" "}
//                 {new Date(signal.time).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeviceDetail;
