//external imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import * as ticketsActions from '../../store/tickets';

export default function TicketButton({ eventId, ticketId, userId }) {

    // console.log('gah', ticketId, !!ticketId);

    //hooks
    const dispatch = useDispatch();
    // const [hasTicket, setHasTicket] = useState(!!ticketId);
    let hasTicket = false;
    const sessionUser = useSelector( (state) => state.session.user );
    let arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('array', arrTicketsOfSessionUser);

    arrTicketsOfSessionUser.forEach( ticket => {
        if (+ticket.id === +ticketId) {hasTicket = true}
    });

    //useEffects
    useEffect( () => {
        dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    }, [dispatch, sessionUser])

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
    function clickTicketButton() {
        if (hasTicket) {
            hasTicket = !hasTicket;
            return cancelTicket();
        }
        else {
            hasTicket = !hasTicket;
            return registerForEvent()
        }
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
        <button
            onClick={clickTicketButton}
            className={`pure-button`}
        >
            {/* {buttonText} */}
            {hasTicket ? 'Cancel Ticket' : 'Register for Event'}
        </button>
    );
}