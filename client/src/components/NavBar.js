import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: '#00d8ff',
  textDecoration: 'none',
  color: 'white',
}
const activelink = {
  background: 'darkblue'
}

const NavBar = () => {
  return ( //stuff that the user sees no matter what
    <div className="navbar" >
        <span >
          <NavLink className="navlink" to="/" exact id="navlink0" style={link} activeStyle={activelink} >
            Places
          </NavLink>
        </span>
    </div>
  );
};
//note to self. Wrap these nav elements around some dope looking shit like the index bars from a while ago.
export default NavBar;
