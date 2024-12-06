import { ReactNode } from "react"
import Navbar from "../component/bars/Navbar"
import { Sidebar } from "../component/bars/Sidebar"
interface LayoutProps{
    children: ReactNode
}
const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="flex flex-col h-screen mx-auto border-2 border-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-800 text-white">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout