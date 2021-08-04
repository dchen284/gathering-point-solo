//external imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import './TicketButton.css';
import * as sessionActions from '../../store/session';
// import * as ticketsActions from '../../store/tickets';

export default function TicketButton({ eventId }) {

    //hooks
    const dispatch = useDispatch();

    const sessionUser = useSelector( (state) => state.session.user );
    // const ticket = useSelector( (state) => state.session.user.UserTickets[eventId] );
    // let ticket = null;

    const [hasTicket, setHasTicket] = useState(false);


    //useEffects
    useEffect( () => {
        if (!sessionUser) {setHasTicket(false)}
        if (sessionUser?.UserTickets) {setHasTicket(sessionUser.UserTickets[eventId])}
    }, [dispatch, eventId, sessionUser])

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
            className={ hasTicket ? `btn-secondary btn-register-cancel` : `btn-register`}
        >
            {hasTicket ? 'Cancel Ticket' : 'Register'}
        </button>
    );
}