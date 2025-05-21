import client from "./database"

export async function fetchMeasurements(): Promise<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderRadius: number }[] } > {
  // Monday morning UNIX time
  const mondayMorning = new Date()
  mondayMorning.setDate(mondayMorning.getDate() - (mondayMorning.getDay() + 6) % 7)
  mondayMorning.setHours(0, 0, 0, 0)
  const mondayMorningUnix = Math.floor(mondayMorning.getTime() / 1000)

  // Sunday evening UNIX time
  const sundayEvening = new Date()
  sundayEvening.setDate(sundayEvening.getDate() - (sundayEvening.getDay() + 1) % 7)
  sundayEvening.setHours(23, 59, 59, 999)
  const sundayEveningUnix = Math.floor(sundayEvening.getTime() / 1000)


  // Fix for multiuse support
  client.db("LightGuide").collection("measurements").find({ "Timestamp": { "$gte": mondayMorningUnix, "$lte": sundayEveningUnix } }).toArray()
    .then((data) => {
      const graphData = {
        labels: ["M", "Ti", "O", "To", "F", "L", "S"],
        datasets: [
          {
            label: "Activity",
            data: [30, 70, 50, 90, 25, 65, 75],
            backgroundColor: "rgba(135, 206, 250, 0.8)", // Light blue
            borderRadius: 6,
          },
        ],
      }
      data.map((item) => {
        const date = new Date(item.Timestamp * 1000)
        const day = (date.getDay() + 1) % 7
        graphData.datasets[0].data[day] += 1
      })

      return graphData

    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
  return {
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
}