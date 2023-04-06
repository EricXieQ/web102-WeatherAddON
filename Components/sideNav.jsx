import React from 'react';
import './SideNav.css'
import { Link, Outlet } from 'react-router-dom';

const SideNav = (props) => {

return (
  <div className="sidenav">
    <div className='menu'>
        <ul>
            <li className='menu-header'>
                <nav>
                    <Link to="/"> DashBoard </Link>
                </nav>
                    <div className='dataINFO'>
                        <li component="div" className='stats'>Total Data: {props.total}</li>
                        <li component="div" className='stats'>Average Temperture: {props.sum_temp/props.total}°C</li>
                        <li component="div" className='stats'>Hottest recently: {props.max}°C</li>
                    </div>
            </li>

            <li className='menu-item'>
                Search 🔍
            </li>  

            <li className='menu-item'>
                About ℹ️ 
            </li>      
        </ul>     
    </div>
        <Outlet />
  </div>
)}

export default SideNav;