import { useEffect, useState } from "react";
import CONSTANTS from "../../config/constant"
import { getCurrentDateTimeInIST } from "../../config/DateAndTime";
import { Link } from "react-router-dom";


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
            
            <span ><Link to="/generate" className="hover:underline mr-10"> Select verison </Link></span>
            <span className="mr-4">Version: {CONSTANTS.version}</span>
            <span>Date:{dateTime}</span>
          </div>
    </header>
  )
}

export default Navbar;