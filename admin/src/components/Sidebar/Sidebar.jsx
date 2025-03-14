import React from 'react';
import "./Sidebar.css";
import { assets } from "../../assets/assets"

const Sidebar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Sidebar;
