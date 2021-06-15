//external imports

//internal imports
import { csrfFetch } from './csrf';
import * as ticketsActions from './tickets';

//action type strings

  //session
const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

  //tickets
// const ADD_TICKET = 'session/ADD_TICKET';

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
        console.log('returned data', data);
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

// export const loginDemoUser = () => async (dispatch) => {
//   // const { credential, password } = userData;
//   // console.log('userData', userData);
//   const res = await csrfFetch('/api/session/demo-user', {
//       method: 'POST',
//       body: JSON.stringify({}),
//   });
//   const data = await res.json();
//   if (res.ok) {
//       console.log('returned data', data);
//       dispatch(setSessionUser(data.user));
//       // console.log('tickets?', data.user.UserTickets)

//       // dispatch(ticketsActions.loadTickets(data.user.UserTickets));
//       // const copyOfTickets = JSON.parse(JSON.stringify(data.user.UserTickets));
//       // console.log('copyOfTickets', copyOfTickets);
//       // dispatch(ticketsActions.loadTickets(copyOfTickets));
//       return data.user;
//   }
//   else {
//       throw res;
//   }
// }

export const restoreSessionUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
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
// export const fetchAddTicketForUser = (ticketData) => async (dispatch) => {
//   // const res = await csrfFetch(
//   //   `api/users/:${ticketData.userId}/events/${ticketData.eventId}/tickets`,
//   //   {
//   //     method: 'POST',
//   //     body: JSON.stringify(ticketData),
//   //   }
//   // )
//   // if (res.ok) {
//   //   const data = await res.json();
//     console.log('got here');
//     dispatch(addTicketForUser(ticketData));
//     console.log('did that?')
//     // dispatch(addTicketForEvent(data));
//     return ticketData;
//   // }
// }

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

// export function addTicketForUser(data) {
//   return {
//     type: ADD_TICKET,
//     payload: data,
//   }
// }

//reducer

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    let newState;
    switch (action.type) {
      // Do something here based on the different types of actions
      // case ADD_TICKET:
      //   newState = Object.assign({}, state);
      //   const newTicket = action.payload;
      //   newState.user.UserTickets['temp'] = newTicket;
      //   console.log('updated state', newState);
      //   return newState;
      case SET_SESSION_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        // if (newState.user) {delete newState.user.UserTickets};
        return newState;
        // return { user: action.payload };
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