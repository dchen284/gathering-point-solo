//external imports
import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
// import TicketButton from '../TicketButton';
// import * as sessionActions from '../../store/session';
// import { useEffect } from 'react';
// import * as ticketsActions from '../../store/tickets';
import * as eventsActions from '../../store/events';
import formatTime from '../../utils/format-time';
import NotFound404 from '../NotFound404';
import './UserDataDisplay.css';

export default function UserDataDisplay({strDataType}) {

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    const objEvents = useSelector((state) => state.events );
    let arrEventsToDisplay;
    if (sessionUser) {
        if (strDataType === "tickets") {arrEventsToDisplay = Object.values(sessionUser.UserTickets)}
        if (strDataType === "likes") {arrEventsToDisplay = Object.values(sessionUser.UserBookmarks)}
        if (strDataType === "events") {
            arrEventsToDisplay = Object.values(objEvents).filter(event => +event.ownerId === +sessionUser.id);
        }
    }
    const { userId } = useParams();


    //useEffects
    //For each ticket/bookmark/like, if that item's event is not in the store, fetch that event
    useEffect( () => {
        if (arrEventsToDisplay && strDataType !== "events") {
            arrEventsToDisplay.forEach(event => {
                if(!objEvents[event.eventId]) {
                    dispatch(eventsActions.fetchEventById(event.eventId));
                }
            });
        }
    }, [dispatch, arrEventsToDisplay, strDataType, objEvents])

    //If the
    useEffect( () => {
        if (arrEventsToDisplay && !arrEventsToDisplay.length && strDataType === "events") {
            dispatch(eventsActions.fetchEvents());
        }
    }, [dispatch, arrEventsToDisplay, strDataType])

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

    function truncateString(strInput, numStringLength) {
        return strInput.length > numStringLength ?
                 strInput.slice(0, numStringLength - 3) + '...' :
                 strInput;
     }

    //JSX
    //if the user is not logged in, or the user is attempting to access another user's page
    //if the user is not logged in, redirect to home page
    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }
    //if the user attempts to access another user's page, provide a 404 message
    else if (+userId !== sessionUser.id) {
        return (
            <NotFound404 />
        )
    }
    else {
        return (
            <div className="user_items_display_container">
                <div className='user_data_container'>
                    <div className="user_data__circle">
                        <i className='far fa-user' />
                    </div>

                    <div className="user_data__username">{sessionUser.username}</div>
                    <div className="user_data__user_text">
                        <a href={`/users/${sessionUser.id}/tickets`} className="user_data__user_link">
                            <span>{Object.values(sessionUser.UserTickets).length}</span>
                            <span> orders</span>
                        </a>
                        <span> • </span>
                        <a href={`/users/${sessionUser.id}/likes`} className="user_data__user_link">
                            <span>{Object.values(sessionUser.UserBookmarks).length}</span>
                            <span> likes</span>
                        </a>
                    </div>

                </div>
                <div className='event_long_card_container'>
                        <div className="event_long_card_container__title">
                            {strDataType === 'tickets' && 'Orders'}
                            {strDataType === 'likes' && 'Likes'}
                            {strDataType === 'events' && 'Events Created By You!'}
                        </div>
                        {arrEventsToDisplay.length ? null : <div className="event_long_card__no-data">No events to display.</div>}
                        {
                            arrEventsToDisplay.map( (event) => {
                                if (objEvents[event.eventId]) {
                                    return (
                                        <div key={`${objEvents[event.eventId].id}`}>
                                            <Link to={`/events/${objEvents[event.eventId].id}`}>
                                                <div className='event_long_card'>
                                                    <div className='event__left_date'>
                                                        <div className='event__month'>
                                                            {getMonth(objEvents[event.eventId].startTime)}
                                                        </div>
                                                        <div className='event__day'>
                                                            {getDay(objEvents[event.eventId].startTime)}
                                                        </div>
                                                    </div>

                                                    <img
                                                    alt='Event Splash'
                                                    className='event__image'
                                                    src=
                                                        {
                                                            objEvents[event.eventId].imgUrl ?
                                                            objEvents[event.eventId].imgUrl :
                                                            "/images/thb-278-plains.jpeg"
                                                        }
                                                    />
                                                    <div className='event__text'>
                                                        <div className='event__title'>
                                                            {truncateString(objEvents[event.eventId].title, 42)}
                                                        </div>
                                                        <div className='event__start-time'>
                                                            {formatTime(objEvents[event.eventId].startTime)}
                                                        </div>
                                                        <div className='event__order-time'>
                                                            <span>Order placed at </span>
                                                            {formatTime(objEvents[event.eventId].createdAt)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                                else if (strDataType === "events") {
                                    return (
                                        <div key={`${objEvents[event.id].id}`}>
                                            <Link to={`/events/${objEvents[event.id].id}`}>
                                                <div className='event_long_card'>
                                                    <div className='event__left_date'>
                                                        <div className='event__month'>
                                                            {getMonth(objEvents[event.id].startTime)}
                                                        </div>
                                                        <div className='event__day'>
                                                            {getDay(objEvents[event.id].startTime)}
                                                        </div>
                                                    </div>

                                                    <img
                                                    alt='Event Splash'
                                                    className='event__image'
                                                    src=
                                                        {
                                                            objEvents[event.id].imgUrl ?
                                                            objEvents[event.id].imgUrl :
                                                            "/images/thb-278-plains.jpeg"
                                                        }
                                                    />
                                                    <div className='event__text'>
                                                        <div className='event__title'>
                                                            {truncateString(objEvents[event.id].title, 42)}
                                                        </div>
                                                        <div className='event__start-time'>
                                                            {formatTime(objEvents[event.id].startTime)}
                                                        </div>
                                                        <div className='event__order-time'>
                                                            <span>Order placed at </span>
                                                            {formatTime(objEvents[event.id].createdAt)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                                else {
                                    return null;
                                }

                            })
                        }
                </div>
            </div>
        );
    }

}