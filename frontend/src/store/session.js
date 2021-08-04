//external imports

//internal imports
import { csrfFetch } from './csrf';
// import * as ticketsActions from './tickets';

//action type strings

  //session
const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

  //tickets
const ADD_TICKET = 'session/ADD_TICKET';
const REMOVE_TICKET = 'session/REMOVE_TICKET';

  //bookmarks
const ADD_BOOKMARK = 'session/ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'session/REMOVE_BOOKMARK';

//thunk action creators

  //login and signup
export const login = (userData) => async (dispatch) => {
    // const { credential, password } = userData;
    // console.log('userData', userData);
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
        // console.log('returned data', data);
        dispatch(setSessionUser(data.user));
        // console.log('tickets?', data.user.UserTickets)

        // dispatch(ticketsActions.loadTickets(data.user.UserTickets));
        // const copyOfTickets = JSON.parse(JSON.stringify(data.user.UserTickets));
        // console.log('copyOfTickets', copyOfTickets);
        // dispatch(ticketsActions.loadTickets(copyOfTickets));
        return data.user;
    }
    else {
        throw res;
    }
}

export const restoreSessionUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  // console.log('data in thunk', data);
  dispatch(setSessionUser(data.user));
  return res;
}

//from example
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

//redo
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSessionUser());
  return response;
};

  //tickets
export const fetchAddTicket = (eventId, userId) => async (dispatch) => {

  // console.log('eventId', eventId, 'userId', userId);

  const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/tickets`,
    {
        method: 'POST',
        body: JSON.stringify({userId, eventId}),
    }
  );
  if (res.ok) {
    const data = await res.json();
    // console.log(data);
    dispatch(addTicket(data));
    return;
  } else {
    return res;
  }
}

export const fetchRemoveTicket = (eventId, userId) => async (dispatch) => {

  // console.log('eventId', eventId, 'userId', userId);

  const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/tickets`,
    {
        method: 'DELETE',
        body: JSON.stringify({userId, eventId}),
    }
  );
  if (res.ok) {
    dispatch(removeTicket(eventId));
    return;
  } else {
    return res;
  }
}

  //bookmarks
  export const fetchAddBookmark = (eventId, userId) => async (dispatch) => {

    // console.log('eventId', eventId, 'userId', userId);

    const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/bookmarks`,
      {
          method: 'POST',
          body: JSON.stringify({userId, eventId}),
      }
    );
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      dispatch(addBookmark(data));
      return;
    } else {
      return res;
    }
  }

  export const fetchRemoveBookmark = (eventId, userId) => async (dispatch) => {

    // console.log('eventId', eventId, 'userId', userId);

    const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/bookmarks`,
      {
          method: 'DELETE',
          body: JSON.stringify({userId, eventId}),
      }
    );
    if (res.ok) {
      dispatch(removeBookmark(eventId));
      return;
    } else {
      return res;
    }
  }


//action creators

export function setSessionUser(user) {
    return {
      type: SET_SESSION_USER,
      payload: user
    }
}

export function removeSessionUser() {
    return {
        type: REMOVE_SESSION_USER,
    }
}

export function addTicket(ticket) {
  return {
    type: ADD_TICKET,
    payload: ticket,
  }
}

export function removeTicket(eventId) {
  return {
    type: REMOVE_TICKET,
    payload: eventId,
  }
}

export function addBookmark(bookmark) {
  return {
    type: ADD_BOOKMARK,
    payload: bookmark,
  }
}

export function removeBookmark(eventId) {
  return {
    type: REMOVE_BOOKMARK,
    payload: eventId,
  }
}

//reducer

const initialState = { user: null };


export default function sessionReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    let newState;

    // Helper function to generate copy of state
    const makeCopyOfState = () => {
      let copyOfState = { ...state };
      copyOfState.user = { ...state.user };
      copyOfState.user.UserBookmarks = { ...state.user.UserBookmarks };
      copyOfState.user.UserTickets = { ...state.user.UserTickets };
      return copyOfState;
    }

    // switch block

    switch (action.type) {

      case ADD_TICKET:
        newState = makeCopyOfState();
        const newTicket = action.payload;
        newState.user.UserTickets[newTicket.eventId] = newTicket;
        return newState;

      case REMOVE_TICKET:
        newState = makeCopyOfState();
        const eventIdOfDeletedTicket = action.payload;
        delete newState.user.UserTickets[eventIdOfDeletedTicket];
        return newState;

      case ADD_BOOKMARK:
        newState = makeCopyOfState();
        const newBookmark = action.payload;
        newState.user.UserBookmarks[newBookmark.eventId] = newBookmark;
        return newState;

      case REMOVE_BOOKMARK:
        newState = makeCopyOfState();
        const eventIdOfDeletedBookmark = action.payload;
        delete newState.user.UserBookmarks[eventIdOfDeletedBookmark];
        return newState;

      case SET_SESSION_USER:
        newState = { user: action.payload };
        // console.log('+++++++', action.payload);
        // reshape UserTickets to object, with eventId as key

        if (action.payload && action.payload.UserTickets) {
          let objUserTickets = {};
          action.payload.UserTickets.forEach(ticket => {
            objUserTickets[ticket.eventId] = ticket;
          })
          newState.user.UserTickets = objUserTickets;
        }

        // reshape UserBookmarks to object, with eventId as key

        if (action.payload && action.payload.UserBookmarks) {
          let objUserBookmarks = {};
          action.payload.UserBookmarks.forEach(bookmark => {
            objUserBookmarks[bookmark.eventId] = bookmark;
          })
          newState.user.UserBookmarks = objUserBookmarks;
        }

        return newState;

        // return { ...state, user: action.payload };
      case REMOVE_SESSION_USER:
        // newState = Object.assign({}, state);
        // newState.user = null;
        // return newState;
        return {...initialState};
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state;
    }
  }


// unused AWS code

// export const createUser = (user) => async (dispatch) => {
//   const { images, image, username, email, password } = user;
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("email", email);
//   formData.append("password", password);

//   // for multiple files
//   if (images && images.length !== 0) {
//     for (var i = 0; i < images.length; i++) {
//       formData.append("images", images[i]);
//     }
//   }

//   // for single file
//   if (image) formData.append("image", image);

//   const res = await csrfFetch(`/api/users/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   });

//   const data = await res.json();
//   dispatch(setSessionUser(data.user));
// };
