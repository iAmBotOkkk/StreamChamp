import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { Bell, LogOut } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../lib/api.js'
import toast from 'react-hot-toast'

const Navbar = () => {
   const {authUser} = useAuthUser()
   const location = useLocation()
   const isChatPage = location.pathname?.startsWith("/chat") 
   const queryClient = useQueryClient();

   const { mutate : logoutMutation, isPending, error} = useMutation({
    mutationFn : logout,
    onSuccess : () => {
      toast.success("You are logout sucessfully");
      queryClient.invalidateQueries({queryKey : ["authUser"]})
    },

    onError : () => {
      toast.error(error?.response?.data || "Logout Failed")
    }

   });


  return (
     <nav className='bg-gray-50  sticky top-0 z-30 ' >
      <div className='flex justify-end items-center h-18 gap-4 p-4 '>
        <div>
          {isChatPage && (
            <div>
              <Link to={"/"}>
              <span className='text-2xl font-semibold'>StreamChamp</span>
              </Link>
            </div>
          ) }
        </div>
        <div className='hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 hover:rounded-full p-3 cursor-pointer'>  
             <Link to={"/notification"}>
                   <Bell className='size-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
             </Link>
        </div>
        <div className='flex justify-center items-center gap-1'>
              <img src= {authUser.profilePic}
               alt="User Avatar"
               className='h-8 w-8 rounded-full object-cover' />
            <p className='text-lg'>{authUser.fullname}</p>
        </div>
        <button onClick={logoutMutation} className='hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 hover:rounded-full p-3 cursor-pointer'>
          <LogOut className='size-6 cursor-pointer  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
        </button>
      </div>
     </nav>
  )
}

export default Navbar
