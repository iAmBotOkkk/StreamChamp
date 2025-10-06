import { Bell, HomeIcon, User2 } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser'

const Sidebar = () => {
   const { authUser } = useAuthUser();
   const location = useLocation();
   const currentPath = location.pathname
   
   return (
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
               <li>
                  <Link to={"/"} className='flex items-center text-gray-900 rounded-lg dark:text-white h group'>
                     <span className='ms-3 text-2xl font-bold'>StreamChamp</span>
                  </Link>
               </li>
               <li>
                  <Link to={"/"} className={`flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-700 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 group
            ${currentPath === "/" ? "bg-blue-50 dark:bg-blue-700" : ""}`}
                  >                
                     <HomeIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white" />
                     <span className="ms-3">Home</span>
                  </Link>
                  
               </li>
               <li>
                  <Link to="/friends" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-700 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 group">
                     <User2 className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white" />
                     <span className="flex-1 ms-3 whitespace-nowrap">Friends</span>
                  </Link>
               </li>
               <li>
                  <Link to="/notification" className="flex items-center p-2 text-gray-900 rounded-lg hover:text-blue-700 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 group">
                     <Bell className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white" />
                     <span className="flex-1 ms-3 whitespace-nowrap">notification</span>

                  </Link>
               </li>
            </ul>
            <div className="p-4 border-t border-base-300 mt-5 flex items-center justify-between gap-3">
               <div className="relative">
                  <img
                     src={authUser?.profilePic}
                     alt="User Avatar"
                     className="w-10 h-10 rounded-full object-cover"
                  />
                  {authUser && (
                     <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
               </div>
               <div className="flex flex-col">
                  <span className="font-medium">{authUser?.fullname}</span>
                  <span className="text-xs text-green-500">Online</span>
               </div>
            </div>
         </div>
      </aside>

   )
}

export default Sidebar
