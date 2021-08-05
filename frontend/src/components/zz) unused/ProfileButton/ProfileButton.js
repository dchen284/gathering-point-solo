// //external imports
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from 'react-redux';

// //internal imports
// import './ProfileButton.css';
// import * as sessionActions from '../../store/session';
// // import * as ticketActions from '../../store/tickets';

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     // dispatch(ticketActions.clearTicketsOnLogOut())
//   };

//   return (
//     <>
//       <span className="profile-button">
//         <button className="pure-button" onClick={openMenu}>
//           <i className="fas fa-user-circle" />
//         </button>
//         {showMenu && (
//           <ul className="profile-dropdown">
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             {/* <li className="profile-button__li-navlink" > */}
//               <NavLink
//                 to={`/users/${user.id}/tickets`}
//                 className="pure-button"
//                 >My Tickets</NavLink>
//             {/* </li> */}
//             {/* <li className="profile-button__li-navlink" > */}
//               <NavLink
//                 to={`/users/${user.id}/tickets`}
//                 className="pure-button"
//               >My Bookmarks</NavLink>
//             {/* </li> */}
//             {/* <li className="profile-button__li-navlink"> */}
//               <NavLink
//                 to={`/users/${user.id}/tickets`}
//                 className="pure-button"
//               >Events Created By Me</NavLink>
//             {/* </li> */}
//             {/* <li> */}
//               <button className="pure-button" onClick={logout}>Log Out</button>
//             {/* </li> */}
//           </ul>
//         )}
//       </span>

//     </>
//   );
// }

// export default ProfileButton;