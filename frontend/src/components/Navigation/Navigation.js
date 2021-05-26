//external imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


//internal imports
import './Navigation.css';
import EventFormModal from '../EventFormModal';
import DemoUserButton from '../DemoUserButton';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from '../ProfileButton';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }){
const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <EventFormModal formAction='Create' />
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
          <div className='nav__logo__text'>Gathering Point</div>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/">
          <button className="pure-button">Home</button>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;