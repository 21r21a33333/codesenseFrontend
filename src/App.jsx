import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/courses" element={<>hello</>} />
      </Route>
    </Routes>
  </BrowserRouter>

  )
  }

export default App
