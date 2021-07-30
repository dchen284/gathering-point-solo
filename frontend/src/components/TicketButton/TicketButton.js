//external imports
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
//internal imports
import './TicketButton.css';
// import * as sessionActions from '../../store/session';
// import * as ticketsActions from '../../store/tickets';

export default function TicketButton({ eventId, ticketId, userId }) {

    // console.log('gah', ticketId, !!ticketId);

    //hooks
    // const dispatch = useDispatch();
    // const [hasTicket, setHasTicket] = useState(false);
    // let hasTicket = false;
    // const sessionUser = useSelector( (state) => state.session.user );
    // let arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('array', arrTicketsOfSessionUser);

    // arrTicketsOfSessionUser.forEach( ticket => {
    //     // if (+ticket.id === +ticketId) {hasTicket = true}
    //     if (+ticket.id === +ticketId) {setHasTicket(true)}
    // });

    //useEffects
    // useEffect( () => {
    //     dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));

    //     arrTicketsOfSessionUser.forEach( ticket => {
    //         // if (+ticket.id === +ticketId) {hasTicket = true}
    //         if (+ticket.id === +ticketId) {setHasTicket(true)}
    //     });

    // }, [dispatch, sessionUser, ticketId])

    //JavaScript
        //button text toggle
    // let buttonText;

    // if (ticketId) {
    //     buttonText = 'Cancel Ticket';
    // }
    // else {
    //     buttonText = 'Register for Event';
    // }
        //button callback function toggle
    // function clickTicketButton() {
    //     setHasTicket((prevHasTicket) => !prevHasTicket)
    //     if (hasTicket) {
    //         return cancelTicket();
    //     }
    //     else {
    //         return registerForEvent()
    //     }
    // }

    //     //button callback function options
    // function cancelTicket() {
    //     dispatch(ticketsActions.fetchTicketToRemove(eventId, ticketId, userId));

    // }

    // function registerForEvent() {
    //     dispatch(ticketsActions.fetchTicketToAdd(eventId, userId));
    // }

    return (
        <button
            // onClick={clickTicketButton}
            // className={ hasTicket ? `pure-button orange` : `pure-button`}
        >
            {/* {buttonText} */}
            Ticket
            {/* {hasTicket ? 'Registered! (Cancel Ticket)' : 'Register for Event'} */}
        </button>
    );
}