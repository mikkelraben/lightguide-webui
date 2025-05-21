"use client"
import { useState } from "react"
import Sidebar from "./sidebar"
import { setSettingsDB, settings } from "@/lib/settings"

export default function SettingsPanel() {
  const [settings, __setSettings] = useState({
    state: false,
    user: "",
    timeLimit: 0,
    colorWalk: [0, 0, 0],
    colorAlarm: [0, 0, 0],
    startTime: "00:00",
    endTime: "00:00",
  })

  const setSettings = (newSettings: settings) => {
    __setSettings(newSettings)
    // Save settings to local storage or database
    setSettingsDB(newSettings)
  }


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
              className={`w-11 h-6 rounded-full transition ${settings.state ? "bg-black" : "bg-gray-400"
                }`}
              onClick={() => setSettings({ ...settings, state: !settings.state })}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition transform ${settings.state ? "translate-x-6" : "translate-x-1"
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
              value={settings.startTime}
              onChange={e => setSettings({ ...settings, startTime: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="turn-off-time">Turn off time</label>
            <input
              id="turn-off-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              value={settings.endTime}
              onChange={e => setSettings({ ...settings, endTime: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="emergency-contact">Emergency contact</label>
            <input
              id="emergency-contact"
              type="tel"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              value={settings.user}
              onChange={e => setSettings({ ...settings, user: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="detection-time">Detection time</label>
            <input
              id="detection-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              value={settings.timeLimit.toString().padStart(2, "0") + ":00"}
              onChange={e => {
                const [minutes, seconds] = e.target.value.split(":").map(Number)
                setSettings({ ...settings, timeLimit: minutes * 60 + seconds })
              }}
            />
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

        </div>
      </div>
    </div>
  )
}
