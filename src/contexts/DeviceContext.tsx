// import React, { createContext, useContext, useState } from "react";

// interface Device {
//   devId: string;
//   mac: string;
//   ssid: string;
//   createdAt: string;
//   createdBy: string;
// }

// interface DeviceContextType {
//   devices: Device[];
//   addDevice: (device: Device) => void;
// }

// const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [devices, setDevices] = useState<Device[]>([]);

//   const addDevice = (device: Device) => {
//     setDevices((prevDevices) => [...prevDevices, device]);
//   };

//   return (
//     <DeviceContext.Provider value={{ devices, addDevice }}>
//       {children}
//     </DeviceContext.Provider>
//   );
// };

// export const useDeviceContext = (): DeviceContextType => {
//   const context = useContext(DeviceContext);
//   if (!context) {
//     throw new Error("useDeviceContext must be used within a DeviceProvider");
//   }
//   return context;
// };
