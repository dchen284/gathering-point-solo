//external imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import './TicketButton.css';
import * as sessionActions from '../../store/session';
// import * as ticketsActions from '../../store/tickets';

export default function TicketButton({ eventId }) {

    //hooks
    const dispatch = useDispatch();

    const sessionUser = useSelector( (state) => state.session.user );
    const ticket = useSelector( (state) => state.session.user.UserTickets[eventId] );
    const [hasTicket, setHasTicket] = useState(!!ticket);
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


        // button callback function toggle
    function clickTicketButton() {

        if (!hasTicket) {dispatch(sessionActions.fetchAddTicket(eventId, sessionUser.id))}
        else {dispatch(sessionActions.fetchRemoveTicket(eventId, sessionUser.id))}
        setHasTicket((prevHasTicket) => !prevHasTicket);
    }

    //     //button callback function options
    // function cancelTicket() {
        // dispatch(ticketsActions.fetchTicketToRemove(eventId, ticketId, userId));

    // }

    // function registerForEvent() {
        // dispatch(ticketsActions.fetchTicketToAdd(eventId, userId));
    // }

    return (
        <button
            onClick={clickTicketButton}
            className={ hasTicket ? `pure-button orange` : `pure-button`}
        >
            {hasTicket ? 'Cancel Ticket' : 'Register for Event'}
        </button>
    );
}