import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { SigninPage } from './pages/SigninPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { NotificationPage } from './pages/NotificationsPage'
import { CallPage } from './pages/CallPage'
import { ChatPage } from './pages/ChatPage'
import toast, { Toaster } from "react-hot-toast"
import Loader from './components/loader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'

const App = () => {

const {isLoading,authUser} = useAuthUser();

const isAuthenticated = Boolean(authUser);
const isOnboarded = authUser?.isOnboarded

  if (isLoading)  return <Loader/>
  return (
    <div>

      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <HomePage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/signin" :"/onboarding"}/>
        ) } />
        <Route path='/signup' element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path='/signin' element= {!isAuthenticated ? <SigninPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>} />
        <Route path='/onboarding' element= {isAuthenticated ? (
          !isOnboarded ? ( <OnboardingPage/>) : ( <Navigate to={"/"}/>)
        ) : (<Navigate to = "/signin" />)} />
        <Route path='/notification' element={isAuthenticated ? <NotificationPage /> : <Navigate to={"/signin"} />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to={"/signin"} />} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to={"/signin"} />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App;
