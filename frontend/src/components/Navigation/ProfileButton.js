import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const { setModalContent, setOnModalClose } = useModal();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const handleInnerClick = (e) => {
    e.stopPropagation();
};

const history = useHistory();



//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//   {user ? (
//     <>
//       <li onClick={handleInnerClick}>Hello {user.firstName}</li>
//       <li onClick={handleInnerClick}>{user.firstName} {user.lastName}</li>
//       <li onClick={handleInnerClick}>{user.email}</li>
//       <li>
//         <button onClick={logout}>Log Out</button>
//       </li>
//     </>
//   ) : (
//     <>
//       <OpenModalMenuItem
//         itemText="Log In"
//         onItemClick={closeMenu}
//         modalComponent={<LoginFormModal />}
//       />
//       <OpenModalMenuItem
//         itemText="Sign Up"
//         onItemClick={closeMenu}
//         modalComponent={<SignupFormModal />}
//       />
//     </>
//   )}
// </ul>
//     </>
//   );

return (
  <>
    <button onClick={openMenu}>
      <i className="fas fa-user-circle" />
    </button>
    <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li onClick={handleInnerClick}>Hello {user.firstName}</li>
          <li onClick={handleInnerClick}>{user.firstName} {user.lastName}</li>
          <li onClick={handleInnerClick}>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
          <OpenModalMenuItem
            itemText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          {/* Directly handle the click event for the "Sign Up" menu item */}
          <li onClick={() => {
            closeMenu();
            setModalContent(<SignupFormModal />);
            setOnModalClose(() => {
              // Add any behavior you want when the modal is closed.
              // For now, it's just a placeholder.
            });
          }}>
            Sign Up
          </li>
        </>
      )}
    </ul>
  </>
);



}

export default ProfileButton;


// const history = useHistory();

// const logoutAndRedirect = (e) => {
//   e.preventDefault();
//   dispatch(sessionActions.logout());
//   history.push('/');
// };