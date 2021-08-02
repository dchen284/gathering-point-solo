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
          <div className='nav__logo__text'>eventmagic</div>
        </NavLink>
      </li>
      <li>
        <SearchBar />
        {/* <div className={focusOnSearch ? 'nav__search nav__search--border_on_focus' : 'nav__search'}>
          <i className="fas fa-search"></i>
          <input
          className='nav__search--box'
          placeholder="Search events"
          onBlur={()=>setFocusOnSearch(false)}
          onFocus={()=>setFocusOnSearch(true)}
          type="search">
          </input>
        </div> */}
      </li>
      <li>
        <div className="nav__button_container">
          <div className="nav__button">
            <i className="fas fa-plus"></i>
            <div>Create an event</div>
          </div>
          <Link to={`/users/${sessionUser?.id}/likes`}>
            <div className="nav__button">
              <i className="far fa-heart"></i>
              <div>Likes</div>
            </div>
          </Link>

          <div className="nav__button">
            <i className="fas fa-ticket-alt"></i>
            <div>Tickets</div>
          </div>
        </div>


        {/* <i className="fas fa-heart"></i> */}
        {/* <i className="far fa-heart"></i> */}
        {/* <i className="fas fa-ticket-alt"></i> */}
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