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
                <div>TicketsDisplay {sessionUser.id}</div>
                <TicketButton />
            </>
        );
    }

}