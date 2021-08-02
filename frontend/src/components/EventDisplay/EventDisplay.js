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
import LoginFormModal from '../LoginFormModal';
import TicketButton from '../TicketButton';
import NotFound404 from '../NotFound404/NotFound404';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    //state
    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector( state => state.events );
    const event = events[eventId];

    //useEffects
    useEffect( () => {
        dispatch(eventsActions.fetchEventById(eventId))
            .then(() => {
                setIsLoaded(true);
            })
            .catch((e)=>{
                setIsLoaded(true);
            })
    }, [dispatch, eventId]);

    // console.log('++++++++isLoaded', isLoaded);
    // console.log('++++++++event', event);

    //JavaScript

    let boolOwnsEvent = false;
    if (sessionUser && event) {
        if (sessionUser.id === event.ownerId)
            {boolOwnsEvent = true}
    }

    return (
        <>
            {!isLoaded && null}
            {isLoaded && !event && <NotFound404 />}
            {isLoaded && event && (
                <div className="event-display-container">
                    <div>
                        <img src={event.imgUrl ? event.imgUrl : '/images/thb-278-plains.jpeg'} alt="Event Splash"/>
                        <div>Event Description: {event.eventBody}</div>
                        <div>Event Category: {event.Category.categoryName}</div>

                    </div>
                    <div>
                        <div className="time-display">Event Start Time: {formatTime(event.startTime)}</div>
                        <div className="time-display">Event End Time: {formatTime(event.endTime)}</div>
                        <br />
                        <div>{event.title}</div>
                        <div>By: {event.organizerName}</div>
                        <br />
                        {sessionUser ?
                        <TicketButton
                            eventId={eventId}
                        />
                        :
                        <>
                            <div>Login to Register!</div>
                            <LoginFormModal />
                        </>
                        }
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