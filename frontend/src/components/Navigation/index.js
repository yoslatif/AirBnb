// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './airbnb-logo-62A2938175-seeklogo.com.png';
import { useHistory } from 'react-router-dom';
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

  const currentUser = useSelector(state => state.session.user);

  const history = useHistory();

  return (
      <nav>
        <div>
          <NavLink to="/">
              <img src={logo} alt="App Logo" className="app-logo" />
          </NavLink>
        </div>
          {/* Other navigation items */}
          {currentUser && (
  <button onClick={() => history.push('/create-spot')}>Create a New Spot</button>
)}
          <div className="menu-dropdown" onClick={toggleDropdown}>
              ===MENU===
              {showDropdown && (
                  <div className="dropdown-content">
                      <ProfileButton user={sessionUser} />
                  </div>
              )}
          </div>
      </nav>
  );
}

export default Navigation;
