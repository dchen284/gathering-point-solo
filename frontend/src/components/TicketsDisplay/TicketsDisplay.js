//external imports
// import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
//internal imports
// import TicketButton from '../TicketButton';
// import * as ticketsActions from '../../store/tickets';
// import formatTime from '../../utils/format-time'

export default function TicketsDisplay() {

    //hooks
    // const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    // let arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('>>>>>>', arrTicketsOfSessionUser);

    // useEffects
    // useEffect( () => {
    //     dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    // }, [dispatch, sessionUser])

    //HTML
    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
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
                        // arrTicketsOfSessionUser.map( (ticket) => {
                        //     return (
                        //         <tr key={`${ticket.id}`}>
                        //             {/* <td>{ticket.id}</td> */}
                        //             <td>{ticket.eventId}</td>
                        //             <td>
                        //                 <Link to={`/events/${ticket.eventId}`}>
                        //                     {ticket.Event.title}
                        //                 </Link>
                        //             </td>
                        //             <td>{formatTime(ticket.Event.startTime)}</td>
                        //             <td>
                        //                 <TicketButton
                        //                     eventId={ticket.eventId}
                        //                     ticketId={ticket.id}
                        //                     userId={sessionUser.id}
                        //                 />
                        //             </td>
                        //         </tr>
                        //     )
                        // })
                    }
                    </tbody>
                </table>

            </>
        );
    }

}