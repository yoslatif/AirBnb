import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import "./ProfileButton.css";
import DropdownProfile from "./DropdownProfile/DropdownProfile";

export default function ProfileButton({ user }) {
    
    
        console.log('ProfileButton user:', user);
    const [showMenu, setShowMenu] = useState(false);
    const ui = useSelector(state => state.ui);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <button className="profileButton" onClick={() => setShowMenu(true)}>
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && <DropdownProfile ui={ui} user={user?.user} />}
        </>
    );
}
