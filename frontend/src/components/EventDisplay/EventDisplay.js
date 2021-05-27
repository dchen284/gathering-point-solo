//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import './EventDisplay.css';
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

    function convertTime(strInputTime) {
        const strDate = strInputTime.slice(0, 10);
        const strHour = strInputTime.slice(11, 13);
        const strMinutes = strInputTime.slice(14, 16);

        let strConvertedTime;

        if (+strHour <= 12) {
            strConvertedTime = `${strDate}, ${strHour}:${strMinutes} AM`;
        }
        else if (+strHour >= 13 && +strHour <= 21)
        {
            strConvertedTime = `${strDate}, 0${+strHour-12}:${strMinutes} PM`;
        }
        else {
            strConvertedTime = `${strDate}, ${+strHour-12}:${strMinutes} PM`;
        }

        return strConvertedTime;
    }

    return (
        <>
            {isLoaded && (
                <div className="event-display-container">
                    <img src={event.imgUrl ? event.imgUrl : 'images/thb-278-plains.jpeg'}/>
                    <div>Event ID: {event.id}</div>
                    <div>Event Title: {event.title}</div>
                    <div>Organizer Name: {event.organizerName}</div>
                    <div>Event Description: {event.eventBody}</div>
                    <div>Event Start Time: {convertTime(event.startTime)}</div>
                    <div>Event End Time: {convertTime(event.endTime)}</div>
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
                </div>
            )}
        </>
    );
}