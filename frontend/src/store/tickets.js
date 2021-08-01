// //external imports

// //internal imports
// import { csrfFetch } from './csrf';


// //action types

// const ADD_TICKET = 'tickets/ADD_TICKET';
// const CLEAR_TICKETS_ON_LOGOUT = 'tickets/CLEAR_TICKETS_ON_LOGOUT';
// const LOAD_TICKETS = 'tickets/LOAD_TICKETS';
// const REMOVE_TICKET = 'tickets/REMOVE_TICKET';
// const REMOVE_TICKETS = 'tickets/REMOVE_TICKETS';

// //thunk action generators

// export function fetchTicketsOfSessionUser(user) {

//     return async function (dispatch) {
//         if (user) {
//             // console.log('got here');
//             const res = await csrfFetch(`/api/users/${user.id}/tickets`);
//             if (res.ok) {
//                 const data = await res.json();
//                 // console.log('data', data);
//                 dispatch(loadTickets(data));
//                 console.log('>>>data', data)
//                 return data;
//             } else {
//                 throw res;
//             }
//         } else {
//             return;
//         }

//     }
// }

// export function fetchTicketsToDeleteFromStore(eventId) {
//     return async function (dispatch) {
//         // console.log('got here>>>>>>>>>>>', eventId)
//         const res = await csrfFetch(`/api/events/${eventId}/tickets/`);
//         if (res.ok) {
//             const data = await res.json();
//             // console.log('data', data)
//             dispatch(removeTickets(data));
//             return data;
//         } else {
//             throw res;
//         }
//     }
// }

// export function fetchTicketToAdd(eventId, userId) {
//     return async function (dispatch) {
//         // console.log('here here');
//         const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/tickets`,
//             {
//                 method: 'POST',
//                 body: JSON.stringify({userId, eventId}),
//             }
//         );
//         if (res.ok) {
//             const data = await res.json();
//             dispatch(addTicket(data));
//             return data;
//         } else {
//             throw res;
//         }
//     }
// }

// export function fetchTicketToRemove(eventId, ticketId, userId) {
//     return async function (dispatch) {
//         const res = await csrfFetch(`/api/users/${userId}/events/${eventId}/tickets`,
//             {
//                 method: 'DELETE',
//                 body: JSON.stringify({ticketId}),
//             }
//         );
//         if (res.ok) {

//             const data = await res.json();
//             // console.log('data in fetchTicketToRemove', data)
//             dispatch(removeTicket(data));
//             return data;
//         } else {
//             throw res;
//         }
//     }
// }

// //action generators

// export function addTicket(objTicket) {
//     return {
//         type: ADD_TICKET,
//         payload: objTicket,
//     }
// }

// export function clearTicketsOnLogOut() {
//     return {
//         type: CLEAR_TICKETS_ON_LOGOUT,
//         //payload
//     }
// }

// export function loadTickets(arrTickets) {
//     return {
//         type: LOAD_TICKETS,
//         payload: arrTickets,
//     }
// }

// export function removeTicket(ticket) {
//     return {
//         type: REMOVE_TICKET,
//         payload: ticket,
//     }
// }

// export function removeTickets(tickets) {
//     return {
//         type: REMOVE_TICKETS,
//         payload: tickets,
//     }
// }


// //initial state

// const initialState = {};

// //reducer

// export default function ticketsReducer(state = initialState, action) {
//     // The reducer normally looks at the action type field to decide what happens
//     let newState;
//     switch (action.type) {
//       // Do something here based on the different types of actions
//       case ADD_TICKET:
//         newState = {...state};
//         const ticketToAdd = action.payload;
//         newState[ticketToAdd.id] = ticketToAdd;
//         return newState;

//       case CLEAR_TICKETS_ON_LOGOUT:
//          newState = {};
//          return newState;

//       case LOAD_TICKETS:
//         newState = {...state};
//         const arrTicketsToLoad = action.payload;
//         console.log('>>>>>>>>arrTicketsToLoad', arrTicketsToLoad)
//         arrTicketsToLoad.forEach( ticket => {
//             console.log('>>>>>>ticket', ticket)
//             newState[ticket.id] = ticket;
//         });
//         return newState;

//       case REMOVE_TICKET:
//         newState = {...state};
//         const idOfTicketToRemove = action.payload.id;
//         delete newState[+idOfTicketToRemove];
//         return newState;

//       case REMOVE_TICKETS:
//             newState = {...state};
//             const arrTickets = action.payload;
//             // console.log('before delete state', newState);
//             arrTickets.forEach( ticket => {
//                 delete newState[+ticket.id];
//             })
//             // console.log('newest state', newState);
//             return newState;

//       default:
//         // If this reducer doesn't recognize the action type, or doesn't
//         // care about this specific action, return the existing state unchanged
//         return state
//     }
//   }