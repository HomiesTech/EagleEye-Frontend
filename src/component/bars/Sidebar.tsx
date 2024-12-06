// import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className="w-64 p-4 bg-gray-900 text-white border-r border-white">
    <div className="mb-6">
      <div className="font-bold mb-2">Device Management</div>
      <ul className="space-y-2">
        <li>
          <Link to="/add-device" className="hover:underline">
            Add Device
          </Link>
        </li>
        <li>
          <Link to="/list-device" className="hover:underline">
            List Device
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <div className="font-bold mb-2">Device Monitoring</div>
      <ul className="space-y-2">
        <li>
          <Link to="/devices" className="hover:underline">
            Devices
          </Link>
        </li>
        <li>
          <Link to="/customer" className="hover:underline">
            Customers
          </Link>
        </li>
        <li>Alerts</li>
        <li>Advisory</li>
        <li>History</li>
      </ul>
    </div>
  </aside>
  )
}
