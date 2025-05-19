"use client"
import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js"
import { Info } from "lucide-react"
import Sidebar from "./sidebar"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export default function WeeklyStatsDashboard() {
  const [data] = useState({
    labels: ["M", "Ti", "O", "To", "F", "L", "S"],
    datasets: [
      {
        label: "Activity",
        data: [30, 70, 50, 90, 25, 65, 75],
        backgroundColor: "rgba(135, 206, 250, 0.8)", // Light blue
        borderRadius: 6,
      },
    ],
  })

  return (
    <div className="flex h-screen bg-white font-serif">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow p-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium">Hello User</h1>
          <h2 className="text-2xl font-medium">Last weeks statistics</h2>
          <div className="w-60 h-32 bg-gray-200 p-4 rounded-md">
            <div className="flex items-start space-x-2 mb-2">
              <Info className="w-5 h-5" />
              <p className="text-sm">Lorem ipsum error fugit iste eum.</p>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="mt-10 w-full max-w-4xl mx-auto">
          <Bar
            data={data}
            options={{
              scales: {
                y: { beginAtZero: true, display: false },
                x: { grid: { display: false } },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
