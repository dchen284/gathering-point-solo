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
    const arrTickets = useSelector( (state) => Object.values(state.tickets) );

    console.log('>>>>>>', arrTickets);

    //useEffects
    useEffect( () => {
        console.log(dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser)));
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
                <table class="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Ticket ID#</th>
                            <th>Event Title</th>
                            <th>Cancel Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                    {arrTickets.map( (ticket) => {
                        return (
                            <tr>
                                <td>{ticket.id}</td>
                                <td>{ticket.Event.title}</td>
                                <td><TicketButton /></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </>
        );
    }

}