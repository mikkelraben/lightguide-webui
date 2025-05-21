"use client"
import { useEffect, useState } from "react"
import Sidebar from "./sidebar"
import { getSettingsDB, setSettingsDB, settingsType } from "@/lib/settings"

export default function SettingsPanel() {
  const [settings, __setSettings] = useState({
    state: false,
    timeLimit: 0,
    colorWalk: [0, 0, 0],
    colorAlarm: [0, 0, 0],
    startTime: "00:00",
    endTime: "00:00",
  })

  useEffect(() => {
    getSettingsDB("user123").then((fetchedSettings) => {
      __setSettings(fetchedSettings)
      console.log((Math.floor(settings.timeLimit / 60)).toString().padStart(2, '0') + ":" + (settings.timeLimit % 60).toString().padStart(2, '0'))
    }).catch((error) => {
      console.error("Error fetching settings:", error)
    })
  }, [])


  const setSettings = (newSettings: settingsType) => {
    __setSettings(newSettings)
    // Save settings to local storage or database
    setSettingsDB(newSettings, "user123")
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
            <label htmlFor="detection-time">Detection time</label>
            <input
              id="detection-time"
              type="time"
              className="font-bold px-2 py-1 rounded border border-gray-300"
              value={(Math.floor( settings.timeLimit/60)).toString().padStart(2, '0') + ":" + (settings.timeLimit % 60).toString().padStart(2, '0')}
              onChange={e => {
                const [minutes, seconds] = e.target.value.split(":").map(Number)
                setSettings({ ...settings, timeLimit: minutes * 60 + seconds })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
