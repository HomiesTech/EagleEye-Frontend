// import React from "react";
// import { Link } from "react-router-dom";

// // Define Device interface
// interface Device {
//   deviceId: number;
//   ssid: string | null;
//   macAddress: string | null;
//   ipAddress: string | null;
//   activeState: number;
//   codeVersion: string | null;
// }

// interface DeviceTableProps {
//   devices: Device[];
//   searchQuery?: string;
// }

// const DeviceTable: React.FC<DeviceTableProps> = ({ devices, searchQuery = "" }) => {
//   // Filter devices based on search query
//   const filteredDevices = devices.filter((device) =>
//     (device.deviceId || "").toString().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <table className="w-full text-left border border-white">
//       <thead>
//         <tr className="bg-gray-700 text-white">
//           <th className="p-2 border border-white">ID</th>
//           <th className="p-2 border border-white">Name</th>
//           <th className="p-2 border border-white">MAC Address</th>
//           <th className="p-2 border border-white">IP Address</th>
//           <th className="p-2 border border-white">Active</th>
//           <th className="p-2 border border-white">Version</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredDevices.map((device) => (
//           <tr key={device.deviceId} className="text-white">
//             <td className="p-2 border border-white">
//               <Link to={`/device/${device.deviceId}`} className="text-white-500 hover:underline">
//                 {device.deviceId}
//               </Link>
//             </td>
//             <td className="p-2 border border-white">{device.ssid || "N/A"}</td>
//             <td className="p-2 border border-white">
//               <Link to={`/device/${device.deviceId}`} className="text-white-500 hover:underline">
//                 {device.macAddress || "N/A"}
//               </Link>
//             </td>
//             <td className="p-2 border border-white">{device.ipAddress || "N/A"}</td>
//             <td className="p-2 border border-white">
//               <span
//                 className={`px-3 py-1 rounded-full text-black font-bold ${
//                   device.activeState === 0
//                     ? "bg-red-500" // Inactive
//                     : device.activeState === 1
//                     ? "bg-green-500" // Active
//                     : device.activeState === 2
//                     ? "bg-yellow-600" // Warn
//                     : "bg-gray-200" // Default for unexpected values
//                 }`}
//               >
//                 {device.activeState === 0
//                   ? ""
//                   : device.activeState === 1
//                   ? ""
//                   : device.activeState === 2
//                   ? ""
//                   : "Unknown"}
//               </span>
//             </td>
//             <td className="p-2 border border-white">{device.codeVersion || "N/A"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default DeviceTable;
