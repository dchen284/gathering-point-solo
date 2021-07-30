//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import './EventDisplay.css';
import * as eventsActions from '../../store/events';
// import * as ticketsActions from '../../store/tickets';
import BookmarkButton from '../BookmarkButton';
import DeleteEventButton from '../DeleteEventButton';
import EventFormModal from '../EventFormModal';
import formatTime from '../../utils/format-time'
// import LoginFormModal from '../LoginFormModal';
// import TicketButton from '../TicketButton';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    //state
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector( state => state.events[eventId] );
    // const arrTicketsOfSessionUser = useSelector( (state) => Object.values(state.tickets) );

    // console.log('aaaaaaaa', sessionUser, arrTicketsOfSessionUser);

    //useEffects
    useEffect( () => {
        dispatch(eventsActions.fetchEventById(eventId)).then(() => setIsLoaded(true));
    }, [dispatch, eventId]);

    // useEffect( () => {
    //     dispatch(ticketsActions.fetchTicketsOfSessionUser(sessionUser));
    // }, [dispatch, sessionUser])

    //JavaScript


    // let boolSessionUserHasTicket = false;
    // let ticketId = null;

    // if (sessionUser && arrTicketsOfSessionUser) {
    //     arrTicketsOfSessionUser.forEach( ticket => {
    //         if (+ticket.eventId === +eventId) {ticketId = ticket.id}
    //     });
    // }

    // console.log('ticketId', ticketId);

    let boolOwnsEvent = false;
    if (sessionUser && event) {
        if (sessionUser.id === event.ownerId)
            {boolOwnsEvent = true}
    }

    // function convertTime(strInputTime) {
    //     const strDate = strInputTime.slice(0, 10);
    //     const strHour = strInputTime.slice(11, 13);
    //     const strMinutes = strInputTime.slice(14, 16);

    //     let strConvertedTime;

    //     if (+strHour <= 12) {
    //         strConvertedTime = `${strDate}, ${strHour}:${strMinutes} AM`;
    //     }
    //     else if (+strHour >= 13 && +strHour <= 21)
    //     {
    //         strConvertedTime = `${strDate}, 0${+strHour-12}:${strMinutes} PM`;
    //     }
    //     else {
    //         strConvertedTime = `${strDate}, ${+strHour-12}:${strMinutes} PM`;
    //     }

    //     return strConvertedTime;
    // }

    return (
        <>
            {!isLoaded && <h2>404: Event Not Found</h2>}
            {isLoaded && (
                <div className="event-display-container">
                    <div>
                        <img src={event.imgUrl ? event.imgUrl : '/images/thb-278-plains.jpeg'} alt="Event Splash"/>
                        <div>Event Description: {event.eventBody}</div>


                    </div>
                    <div>
                        <div className="time-display">Event Start Time: {formatTime(event.startTime)}</div>
                        <div className="time-display">Event End Time: {formatTime(event.endTime)}</div>
                        <br />
                        <div>{event.title}</div>
                        <div>By: {event.organizerName}</div>
                        <br />
                        {/* {sessionUser ?
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
                        } */}
                        <br/>
                        <br/>
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
                </div>
            )}
        </>
    );
}