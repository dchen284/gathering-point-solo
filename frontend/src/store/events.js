//internal imports
import { csrfFetch } from "./csrf";

//actions

const ADD_EVENT = 'event/ADD_EVENT';
const DELETE_EVENT = 'event/DELETE_EVENT';
const LOAD_EVENTS = 'event/LOAD_EVENTS';

//thunk action creators

export const fetchEventToAdd = (objNewEvent) => async (dispatch) => {
  const res = await csrfFetch('/api/events/', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify(objNewEvent),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(addEvent(data));
    return data;
    // return;
  }
}

export const fetchEventToDelete = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
    body: JSON.stringify({}),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(deleteEvent(data));
    // return data;
    return;
  }
}

export const fetchEventToUpdate = (updatedEventData) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${updatedEventData.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedEventData),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addEvent(data));
    // return data;
    return;
  }
}

export const fetchEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');
    const data = await res.json();
    dispatch(loadEvents(data));
    return;
}

export const fetchEventById = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);
  // console.log('before data');

  // console.log('after data');
  if (res.ok) {
    const data = await res.json();
    dispatch(addEvent(data));
  }
  else {
    // console.log('got here');
    throw res;
    //how to display this error on the page?
  }
}

//action creators

export const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    payload: event,
  }
}

export const deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    payload: event,
  }
}

export const loadEvents = (events) => {
    return {
      type: LOAD_EVENTS,
      payload: events,
    }
  }

//reducer

const initialState = {}

  // Use the initialState as a default value
  export default function eventsReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    let newState;
    switch (action.type) {
      // Do something here based on the different types of actions
      case ADD_EVENT:
        newState = {...state};
        const eventToAdd = action.payload;
        console.log('in reducer', eventToAdd);
        newState[eventToAdd.id] = eventToAdd;
        newState[eventToAdd.id].Category = eventToAdd.Category;
        return newState;
      case DELETE_EVENT:
        newState = {...state};
        const eventToDelete = action.payload;
        delete newState[eventToDelete.id];
        return newState;
      case LOAD_EVENTS:
        newState = {};
        (action.payload).forEach( event => {
            newState[event.id] = event;
        });
        // console.log('newState', newState);
        return newState;
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state;
    }
  }