// src/utils/api.ts
import axios from "axios";
import Device from "../interface/Device.interface"; // Adjust the path to your actual Device interface file

export const fetchDevices = async (): Promise<Device[]> => {
  const response = await axios.get<Device[]>("https://service.homenetics.in/eagleeye/devices");
  return response.data;
};
