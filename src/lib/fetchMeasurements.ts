"use server"
import client from "./database"

export async function fetchMeasurements(): Promise<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderRadius: number }[] }> {
  // Monday morning UNIX time
  const mondayMorning = new Date()
  mondayMorning.setDate(mondayMorning.getDate() - (mondayMorning.getDay() + 6) % 7)
  mondayMorning.setHours(0, 0, 0, 0)
  const mondayMorningUnix = Math.floor(mondayMorning.getTime() / 1000)

  // Sunday evening UNIX time
  const sundayEvening = new Date()
  sundayEvening.setDate(sundayEvening.getDate() + (0 + (7 - sundayEvening.getDay())) % 7)
  sundayEvening.setHours(23, 59, 59, 999)
  const sundayEveningUnix = Math.floor(sundayEvening.getTime() / 1000)

  console.log("Monday morning UNIX time:", mondayMorningUnix)
  console.log("Sunday evening UNIX time:", sundayEveningUnix)

  const graphData = {
    labels: ["M", "Ti", "O", "To", "F", "L", "S"],
    datasets: [
      {
        label: "Activity",
        data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "rgba(135, 206, 250, 0.8)", // Light blue
    borderRadius: 6,
  },
    ],
}

  // Fix for multiuse support
  await client.db("Lightguide").collection("Measurements").find({ "timestamp": { "$gte": mondayMorningUnix, "$lte": sundayEveningUnix } }).toArray()
    .then((data) => {
      console.log("Fetched data:", data)
      data.map((item) => {
        const date = new Date(item.timestamp * 1000)
        const day = (date.getDay()-1) % 7
        graphData.datasets[0].data[day] += 1
      })
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
  
  
  return graphData
}