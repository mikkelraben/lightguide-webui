"use client"
import { useState } from "react"
import Sidebar from "./sidebar"

export default function SettingsPanel() {
  const [mainSwitch, setMainSwitch] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex h-screen bg-white font-serif">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow px-10 pt-6 space-y-4">
        {/* Headers */}
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium">Hello User</h1>
          <h2 className="text-2xl font-medium">Settings</h2>
        </div>

        {/* Settings */}
        <div className="space-y-4 mt-4 text-lg">
          <div className="flex items-center space-x-4">
            <label htmlFor="main-switch-toggle">Main switch</label>
            <button
              id="main-switch-toggle"
              className={`w-11 h-6 rounded-full transition ${mainSwitch ? "bg-black" : "bg-gray-400"
                }`}
              onClick={() => setMainSwitch(!mainSwitch)}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition transform ${mainSwitch ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="turn-on-time">Turn on time</label>
            <input
              id="turn-on-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              defaultValue="21:00"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="turn-on-time">Turn off time</label>
            <input
              id="turn-on-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              defaultValue="21:00"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="emergency-contact">Emergency contact</label>
            <input
              id="emergency-contact"
              type="tel"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              defaultValue="1-800-555-8831"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="turn-on-time">Detection time</label>
            <input
              id="turn-on-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              defaultValue="05:00"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="dark-mode-toggle">Dark Mode</label>
            <button
              id="dark-mode-toggle"
              className={`w-11 h-6 rounded-full transition ${darkMode ? "bg-black" : "bg-gray-400"
                }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition transform ${darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
