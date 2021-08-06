//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';
import BookmarkButton from '../BookmarkButton';
import EventFormModal from '../EventFormModal';
import formatTime from '../../utils/format-time'
import TicketButton from '../TicketButton';
import NotFound404 from '../NotFound404/NotFound404';
import './EventDisplay.css';
import '../EventCardDisplay/EventCardDisplay.css';
import EventCard from '../EventCard';

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
    const arrEventsToShow = Object.values(events).filter(el => (+el.categoryId === +event.categoryId) && (+el.id !== +event.id));

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
                            <div className='event-display__owner-buttons'>
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
                            </div>
                        </div>

                        <div className='event-display__button-bar'>
                            <BookmarkButton borderStyle="none" eventId={eventId}/>
                            <TicketButton eventId={eventId}/>
                        </div>

                        <div className='event-display__description'>
                            <h2>About this event</h2>
                            <p className='event-display__eventbody'>{event.eventBody}</p>
                            <p className='event-display__category'>Event Category: {event.Category.categoryName}</p>
                        </div>

                        <div className='event-display__white-data-box'>
                            <h3>Date and time</h3>
                            <div>
                                <div>{formatTime(event.startTime)} - </div>
                                <div>{formatTime(event.endTime)}</div>
                            </div>

                            <h3>Location</h3>
                            <p>{event.location ? event.location : '-'}</p>
                        </div>

                        <div className='event-display__other-events'>
                            <h2>Other {event.Category.categoryName} events</h2>
                            <div className="event-card-display--grid">
                            {arrEventsToShow.sort((a, b) => (new Date(a.startTime)).getTime() - (new Date(b.startTime)).getTime() ).map( (event) => {
                                    return <EventCard key={`${event.id}`} event={event}/>
                                })}
                                {
                                    arrEventsToShow.length ? null :
                                    <div className="event-card-display--empty">No events of that category can be found.</div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

/*
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
                        </div>
*/