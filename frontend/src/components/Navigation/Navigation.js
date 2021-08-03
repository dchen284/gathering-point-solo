//external imports
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


//internal imports
import './Navigation.css';
import EventFormModal from '../EventFormModal';
import DemoUserButton from '../DemoUserButton';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from '../ProfileButton';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* {
          sessionUser.profileImageUrl ?
          <img src={sessionUser.profileImageUrl} /> :
          null
        } */}
        {/* <EventFormModal formAction='Create' /> */}
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <DemoUserButton />
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul className='nav'>
      <li className='nav__logo'>
        <NavLink exact to="/">
          <div className='nav__logo__text'>gathering-point</div>
        </NavLink>
      </li>
      <li className='nav__search-container'>
        <SearchBar />
      </li>
      <li className="nav__button_container">
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
      </li>
      <li>
        {/* <NavLink exact to="/">
          <button className="pure-button">Home</button>
        </NavLink> */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;