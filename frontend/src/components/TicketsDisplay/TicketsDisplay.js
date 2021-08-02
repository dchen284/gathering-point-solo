//external imports
import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import TicketButton from '../TicketButton';
// import * as sessionActions from '../../store/session';
// import { useEffect } from 'react';
// import * as ticketsActions from '../../store/tickets';
import * as eventsActions from '../../store/events';
import formatTime from '../../utils/format-time';

export default function TicketsDisplay() {

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    let arrTickets;
    if (sessionUser) {arrTickets = Object.values(sessionUser.UserTickets)}
    // const arrTickets = useSelector( (state) => Object.values(state.session.user.UserTickets) );
    const objEvents = useSelector((state) => state.events );
    const { userId } = useParams();
    // const [isLoaded, setIsLoaded] = useState(false);

    // console.log('>>>>>>arrTickets', arrTickets);
    // console.log('+++++++objEvents', objEvents);
    // console.log('@@@@@', isLoaded);

    //useEffects
    //For each ticket, if that ticket's event is not in the store, fetch that event
    useEffect( () => {
        arrTickets.forEach(ticket => {
            if(!objEvents[ticket.eventId]) {
                dispatch(eventsActions.fetchEventById(ticket.eventId));
            }
        });

    }, [dispatch, arrTickets, objEvents])



    //JSX
    //if the user is not logged in, or the user is attempting to access another user's page
    //if the user is not logged in, redirect to home page
    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }
    //if the user attempts to access another user's page, provide a 404 message
    else if (+userId !== sessionUser.id) {
        return (
            <div>404: Not Found</div>
        )
    }
    else {
        return (
            <>
                <h2>My Tickets</h2>
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            {/* <th>Ticket ID#</th> */}
                            <th>Event ID#</th>
                            <th>Event Title</th>
                            <th>Event Start Time</th>
                            <th>Cancel Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        arrTickets.map( (ticket) => {
                            if (objEvents[ticket.eventId]) {
                                return (
                                    <tr key={`${objEvents[ticket.eventId].id}`}>
                                        <td>{objEvents[ticket.eventId].id}</td>
                                        <td>
                                            <Link to={`/events/${objEvents[ticket.eventId].id}`}>
                                                {objEvents[ticket.eventId].title}
                                            </Link>
                                        </td>
                                        <td>{formatTime(objEvents[ticket.eventId].startTime)}</td>
                                        <td>
                                            <TicketButton
                                                eventId={ticket.eventId}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            else {
                                return null;
                            }

                        })
                    }
                    </tbody>
                </table>

            </>
        );
    }

}