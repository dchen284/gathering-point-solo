//external imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import TicketButton from '../TicketButton';
import * as ticketsActions from '../../store/tickets';

export default function TicketsDisplay() {

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    const arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('>>>>>>', arrTicketsOfSessionUser);

    // useEffects
    useEffect( () => {
        dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    }, [dispatch, sessionUser])

    //HTML
    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }
    else {
        return (
            <>
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Ticket ID#</th>
                            <th>Event Title</th>
                            <th>Cancel Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                    {arrTicketsOfSessionUser.map( (ticket) => {
                        return (
                            <tr key={`${ticket.id}`}>
                                <td>{ticket.id}</td>
                                <td>{ticket.Event.title}</td>
                                <td><TicketButton ticketId={ticket.id} /></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </>
        );
    }

}