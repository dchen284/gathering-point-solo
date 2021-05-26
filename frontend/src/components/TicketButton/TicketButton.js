//external imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import * as ticketsActions from '../../store/tickets';

export default function TicketButton({ eventId, ticketId, userId }) {

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );

    //useEffects
    useEffect( () => {
        dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    }, [dispatch, sessionUser])

    //JavaScript
        //button text toggle
    let buttonText;

    if (ticketId) {
        buttonText = 'Cancel Ticket';
    }
    else {
        buttonText = 'Register for Event';
    }
        //button callback function toggle
    function clickTicketButton() {
        if (ticketId) {return cancelTicket()}
        else {return registerForEvent()}
    }

        //button callback function options
    function cancelTicket() {
        console.log('Canceling the Ticket')
        dispatch(ticketsActions.fetchTicketToRemove(eventId, ticketId, userId));

    }

    function registerForEvent() {
        console.log('Registering for Event')
        dispatch(ticketsActions.fetchTicketToAdd(eventId, userId))
    }

    return (
        <button onClick={clickTicketButton} className={`pure-button`}>{buttonText}</button>
    );
}