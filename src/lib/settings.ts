import client from "./database"

export type settings = {
  state: boolean
  user: string
  timeLimit: number
  colorWalk: number[]
  colorAlarm: number[]
  startTime: string
  endTime: string
}

export function setSettingsDB(newSettings: settings) {
  client.db("LightGuide").collection("settings").updateOne(
    { user: newSettings.user },
    { $set: newSettings })
}