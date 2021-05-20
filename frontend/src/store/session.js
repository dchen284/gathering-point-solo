//external imports

//internal imports
import { csrfFetch } from './csrf';

//action type strings
const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

//thunk action creators

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
    }
    else {
        throw res;
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

//reducer

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    let newState;
    switch (action.type) {
      // Do something here based on the different types of actions
      case SET_SESSION_USER:
        // newState = Object.assign({}, state);
        // newState.user = action.payload;
        // return newState;
        return { user: action.payload };
      case REMOVE_SESSION_USER:
        // newState = Object.assign({}, state);
        // newState.user = null;
        // return newState;
        return initialState;
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state;
    }
  }