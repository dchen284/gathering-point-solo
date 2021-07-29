//external imports
import React, { useState } from 'react';
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
  const [focusOnSearch, setFocusOnSearch] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* {
          sessionUser.profileImageUrl ?
          <img src={sessionUser.profileImageUrl} /> :
          null
        } */}
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

  console.log('+++++++', focusOnSearch);
  return (
    <ul className='nav'>
      <li className='nav__logo'>
        <NavLink exact to="/">
          <div className='nav__logo__text'>eventmagic</div>
        </NavLink>
      </li>
      <li>
        <div className={focusOnSearch ? 'nav__search nav__search--border_on_focus' : 'nav__search'}>
          <i className="fas fa-search"></i>
          <input
          className='nav__search--box'
          placeholder="Search events"
          onBlur={()=>setFocusOnSearch(false)}
          onFocus={()=>setFocusOnSearch(true)}
          type="search">
          </input>
        </div>
      </li>
      <li>
        {/* <i className="fas fa-plus"></i>
        <i className="fas fa-heart"></i>
        <i className="far fa-heart"></i>
        <i className="fas fa-ticket-alt"></i> */}
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