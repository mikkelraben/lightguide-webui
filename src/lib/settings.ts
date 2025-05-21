"use server"
import { Collection, ObjectId } from "mongodb"
import client from "./database"

type settings = {
  _id: ObjectId
  state: boolean
  user: string
  timeLimit: number
  colorWalk: number[]
  colorAlarm: number[]
  startTime: string
  endTime: string
}

export type settingsType = {
  state: boolean
  timeLimit: number
  colorWalk: number[]
  colorAlarm: number[]
  startTime: string
  endTime: string
}


export async function setSettingsDB(newSettings: settingsType, user: string) {
  console.log("Saving settings to DB:", newSettings, user)
  client.db("Lightguide").collection("Users").updateOne(
    { user: user },
    { $set: newSettings }).then((result) => {
      if (result.matchedCount === 0) {
        console.log("No matching document found")
      }
    })
}

export async function getSettingsDB(user: string): Promise<settingsType> {

  const collection: Collection<settings> = client.db("Lightguide").collection("Users")
  const settings = await collection.findOne({ user: user })
  if (settings) {
    return {
      state: settings.state,
      timeLimit: settings.timeLimit,
      colorWalk: settings.colorWalk,
      colorAlarm: settings.colorAlarm,
      startTime: settings.startTime,
      endTime: settings.endTime,
    }
  } else {
    console.log("No settings found for user:", user)
    return {
      state: false,
      timeLimit: 0,
      colorWalk: [0, 255, 0],
      colorAlarm: [255, 0, 0],
      startTime: "00:00",
      endTime: "00:00",
    }
  }
}