"use client"
import React from "react"
import Navbar from "./navbar/page"
import Dashboard from "./dashboard/page"
import Sidebar from "./sidebar/page"

const Page: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

        <div className="flex flex-1">
            <Sidebar />

        <div className="flex-1 p-6 overflow-auto">
            <Dashboard/>
        </div>
        </div>
        

        </div>
    )


}

export default Page;