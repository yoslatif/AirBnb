// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './airbnb-logo-62A2938175-seeklogo.com.png';
import { logout } from '../../store/session';

import './Navigation.css';

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <nav>
//       <li>
//         {/* <NavLink exact to="/">Home</NavLink> */}
//         <NavLink to="/">
//           <img src={logo} alt="App Logo" className="app-logo" />
//         </NavLink>
//       </li>
//       {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//       <button className="login-button">Log in</button>
//     </nav>
//   );
// }

function Navigation( isLoaded) {
  const sessionUser = useSelector(state => state.session.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
  };

  const dispatch = useDispatch();

  return (
      <nav>
          <NavLink to="/">
              <img src={logo} alt="App Logo" className="app-logo" />
          </NavLink>
          {/* Other navigation items */}
          <div className="menu-dropdown" onClick={toggleDropdown}>
              Menu
              {showDropdown && (
                  <div className="dropdown-content">
                      <ProfileButton user={sessionUser} />
                      <button onClick={() => dispatch(logout())}>Log Out</button>
                  </div>
              )}
          </div>
      </nav>
  );
}

export default Navigation;
