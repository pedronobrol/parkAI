import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/NavbarBS";
const Layout = () => {
  return (   
    <>
     <Navbar></Navbar>
      <Outlet />
    </>
  )
};

export default Layout;
