import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation component for the application
 */
const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/play" className={({ isActive }) => isActive ? 'active' : ''}>
            Play
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
