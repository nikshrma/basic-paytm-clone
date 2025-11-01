import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { SendMoney } from './pages/SendMoney'
import { Dashboard } from './pages/Dashboard'
import { useState } from 'react'
import { ProtectedRoute } from './components/ProtectedRoute'
import axios from 'axios'


function App() {
    axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
        }/>
      <Route path="/send" element={
        <ProtectedRoute>
        <SendMoney/>
        </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
