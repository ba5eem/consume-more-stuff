import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../containers/Logout';

const AuthNav = () => {
  return (

      <div>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/new-item">New Item</Link>
        <br></br>
        <Link to="/all">All Items</Link>
        <br></br>
        <Link to="/settings">Settings</Link>
        <br></br>
        <Link to="/dashboard">Dashboard</Link>
        <br></br>
        <Logout />
      </div>
      )
}

export default AuthNav;