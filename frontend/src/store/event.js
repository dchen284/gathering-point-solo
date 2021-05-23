//actions

const LOAD_EVENTS = 'event/LOAD_EVENTS';

//thunk action creators

export const fetchEvents = () => async (dispatch) => {
    const res = await fetch('/api/events');
    const data = await res.json();
    dispatch(loadEvents(data));
}

export const fetchEventById = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`);
  console.log('before data');
  const data = await res.json();
  console.log('after data');
  if (res.ok) {
    dispatch(loadEvents([data]));
  }
  else {
    console.log('got here');
    throw res;
    //how to display this error on the page?
  }
}

//action creators

export const loadEvents = (events) => {
    return {
      type: LOAD_EVENTS,
      payload: events
    }
  }

//reducer

const initialState = {}

  // Use the initialState as a default value
  export default function eventReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    let newState;
    switch (action.type) {
      // Do something here based on the different types of actions
      case LOAD_EVENTS:
        newState = {...state};
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