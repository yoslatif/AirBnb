import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../../../../store/session';
import { Link } from "react-router-dom";

export default function DropdownLoggedIn({ user }) {
    console.log(user)
    const dispatch = useDispatch();
    
        useEffect(() => {
            console.log('DropdownLoggedIn re-rendered due to user prop change:', user);
        }, [user]);
    
        console.log('User firstName:', user.firstName);
        console.log('User username:', user.username);
        console.log('User email:', user.email);
    return <>
        <div className="dropdownInfo">Hello, {user.firstName || 'Guest'}!</div>
        <div className="dropdownInfo">Username: {user.username || 'N/A'}</div>
        <div className="dropdownInfo">Email: {user.email || 'N/A'}</div>
        <Link to={`/spotsgrid`} style={{ textDecoration: 'none', backgroundColor: 'transparent', border: 'none', fontSize: '13px', height: '40px', width: '100%', color: '#000',  }}>
            <div className="dropdownInfo">Manage Spots</div>
        </Link>
        <div className="dropdownButton bold" onClick={() => dispatch(logout())}>Log Out</div>
    </>
}
