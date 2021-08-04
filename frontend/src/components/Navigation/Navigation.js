//external imports
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


//internal imports
import './Navigation.css';
import EventFormModal from '../EventFormModal';
import DemoUserButton from '../DemoUserButton';
import LoginFormModal from '../LoginFormModal';
// import ProfileButton from '../ProfileButton';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../SearchBar';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }){

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // dispatch(ticketActions.clearTicketsOnLogOut())
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="nav__button_container">
            <EventFormModal formAction='Create' />
            <Link to={`/users/${sessionUser?.id}/likes`}>
              <div className="nav__button nav__button--likes">
                <i className="far fa-heart"></i>
                <div>Likes</div>
              </div>
            </Link>
            <Link to={`/users/${sessionUser?.id}/tickets`}>
              <div className="nav__button nav__button--tickets">
                <i className="fas fa-ticket-alt"></i>
                <div>Tickets</div>
              </div>
            </Link>

            <div className='dropdown'>
              <div className='dropdown__text'>
                <i className="far fa-user-circle" />
                <div className='dropdown__username'>{sessionUser?.email}</div>
                <i className="fa fa-caret-down" />
              </div>
              <div className='dropdown__content'>
                <Link to={`/users/${sessionUser?.id}/events`}>
                  <div className='dropdown__content-item'>My Events</div>
                </Link>
                <Link to={`/users/${sessionUser?.id}/tickets`}>
                  <div className='dropdown__content-item'>My Tickets</div>
                </Link>
                <Link to={`/users/${sessionUser?.id}/likes`}>
                  <div className='dropdown__content-item'>My Likes</div>
                </Link>
                <div className='dropdown__content-item' onClick={logout}>Log Out</div>
              </div>
            </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="nav__button_container">
          <DemoUserButton />
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </>
    );
  }

  return (
    <>
      <ul className='nav'>
        <li className='nav__logo'>
          <NavLink exact to="/">
            <div className='nav__logo__text'>gathering-point</div>
          </NavLink>
        </li>
        <li className='nav__search-container'>
          <SearchBar />
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>

    </>
  );
}

export default Navigation;