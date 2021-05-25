import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as ticketActions from '../../store/tickets';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(ticketActions.clearTicketsOnLogOut())
  };

  return (
    <>
      <button className="pure-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <NavLink to={`/users/${user.id}/tickets`}>My Tickets</NavLink>
          </li>
          <li>
            <NavLink to={`/events/2`}>My Bookmarks</NavLink>
          </li>
          <li>
            <NavLink to={`/events/2`}>Events Created By Me</NavLink>
          </li>
          <li>
            <button className="pure-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;