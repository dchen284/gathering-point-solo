//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';
import * as ticketsActions from '../../store/tickets';
import BookmarkButton from '../BookmarkButton';
import DeleteEventButton from '../DeleteEventButton';
import EventFormModal from '../EventFormModal';
import LoginFormModal from '../LoginFormModal';
import TicketButton from '../TicketButton';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    //state
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector( state => state.events[eventId] );
    const arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('aaaaaaaa', sessionUser, arrTicketsOfSessionUser);

    //useEffects
    useEffect( () => {
        dispatch(eventsActions.fetchEventById(eventId)).then(() => setIsLoaded(true));
    }, [dispatch, eventId]);

    useEffect( () => {
        dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    }, [dispatch, sessionUser])

    //JavaScript


    // let boolSessionUserHasTicket = false;
    let ticketId = null;

    if (sessionUser && arrTicketsOfSessionUser) {
        arrTicketsOfSessionUser.forEach( ticket => {
            if (+ticket.eventId === +eventId) {ticketId = ticket.id}
        });
    }

    // console.log('ticketId', ticketId);

    let boolOwnsEvent = false;
    if (sessionUser && event) {
        if (sessionUser.id === event.ownerId)
            {boolOwnsEvent = true}
    }

    return (
        <>
            {isLoaded && (
                <>
                    <div>Event Title: {event.title}</div>
                    <div>Organizer Name: {event.organizerName}</div>
                    <div>Event Description: {event.eventBody}</div>
                    <div>Event Start Time: {event.startTime}</div>
                    <div>Event End Time: {event.endTime}</div>
                    {sessionUser ?
                    <TicketButton
                        eventId={eventId}
                        ticketId={ticketId}
                        userId={sessionUser.id}
                    />
                    :
                    <>
                        <div>Login to Register!</div>
                        <LoginFormModal />
                    </>
                    }

                    {
                        boolOwnsEvent ?
                        <>
                            <EventFormModal formAction='Update'/>
                            <DeleteEventButton />
                        </>
                        : null
                    }
                    <BookmarkButton />
                </>
            )}
        </>
    );
}