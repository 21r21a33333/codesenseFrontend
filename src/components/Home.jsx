import React from 'react'
import NavbarComponent from './Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div >
      <NavbarComponent></NavbarComponent>
      <Outlet />
    </div>
  )
}




export default Home



