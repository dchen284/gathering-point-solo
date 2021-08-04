//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

//internal imports
import './EventDisplay.css';
import * as eventsActions from '../../store/events';
// import * as ticketsActions from '../../store/tickets';
import BookmarkButton from '../BookmarkButton';
// import DeleteEventButton from '../DeleteEventButton';
import EventFormModal from '../EventFormModal';
import formatTime from '../../utils/format-time'
import LoginFormModal from '../LoginFormModal';
import TicketButton from '../TicketButton';
import NotFound404 from '../NotFound404/NotFound404';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const history = useHistory();
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

    //JavaScript

    const objMonths = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    }

    function getMonth(strTime) {
        return objMonths[(new Date(strTime)).getUTCMonth()];
    }

    function getDay(strTime) {
        return (new Date(strTime)).getUTCDate();
    }

    function activateDeleteButton() {
        dispatch(eventsActions.fetchEventToDelete(eventId));
        history.push('/');
    }

    return (
        <>
            {!isLoaded && null}
            {isLoaded && !event && <NotFound404 />}
            {isLoaded && event && (
                <div className="event-display-exterior">
                    <img
                     alt="background-blur"
                     className='background-blur'
                     src={event.imgUrl ? event.imgUrl : '/images/thb-278-plains.jpeg'}
                    />
                    <div className="white-blocker"></div>
                    <div className="event-display-container">
                        <img
                        className='event-display__image'
                        src={event.imgUrl ? event.imgUrl : '/images/thb-278-plains.jpeg'}
                        alt="Event Splash"
                        />
                        <div className='event-display__grey-data-box'>
                            <div className='event-display__calendar-date'>
                                <div>{getMonth(event.startTime)}</div>
                                <div>{getDay(event.startTime)}</div>
                            </div>
                            <div className='event-display__title'>{event.title}</div>
                            <div className='event-display__organizer'>by {event.organizerName}</div>
                        </div>
                        <div className='event-display__button-bar'>
                            <BookmarkButton />
                            <TicketButton eventId={eventId}/>
                        </div>
                        <div>
                            <div>Event Description: {event.eventBody}</div>
                            <div>Event Category: {event.Category.categoryName}</div>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>

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
                                (sessionUser?.id === event.ownerId) ?
                                <>
                                    <EventFormModal formAction='Update'/>
                                    <button
                                    className={`btn-secondary`}
                                    onClick={activateDeleteButton}
                                    >
                                        Delete Event
                                    </button>
                                </>
                                : null
                            }
                            <BookmarkButton />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}