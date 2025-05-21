import { Home, Settings } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center w-16 bg-gray-200 py-4 space-y-4">
      <Link href={"/"}>
        <Home className="w-6 h-6 cursor-pointer" />
      </Link>
      <div className="flex-grow" />
      <Link href="/settings">
        <Settings className="w-6 h-6 cursor-pointer" />
      </Link>
    </div>
  )
}