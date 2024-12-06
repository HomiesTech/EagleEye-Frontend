import { useEffect, useState } from "react";
import CONSTANTS from "../../config/constant"
import { getCurrentDateTimeInIST } from "../../config/DateAndTime";


const Navbar = () => {
    const [dateTime,setDateTime] =useState<string>(getCurrentDateTimeInIST());
    useEffect(() => {
        const interval =setInterval(() => {
          setDateTime(getCurrentDateTimeInIST);
        },1000);
        return()=> clearInterval(interval);
      },[]);
  return (
    <header className="flex justify-between items-center p-4 border-b-2 border-white bg-black text-white">
          <div className="font-bold">EagleEye (Homenetics)</div>
          <div>
            <span className="mr-4">Version: {CONSTANTS.version}</span>
            <span>Date:{dateTime}</span>
          </div>
    </header>
  )
}

export default Navbar