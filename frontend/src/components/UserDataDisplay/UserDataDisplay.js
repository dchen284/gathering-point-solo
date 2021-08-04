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
    let arrEventsToDisplay;
    if (sessionUser) {
        if (strDataType === "tickets") {arrEventsToDisplay = Object.values(sessionUser.UserTickets)}
        if (strDataType === "likes") {arrEventsToDisplay = Object.values(sessionUser.UserBookmarks)}
    }
    const objEvents = useSelector((state) => state.events );
    const { userId } = useParams();


    //useEffects
    //For each ticket, if that ticket's event is not in the store, fetch that event
    useEffect( () => {
        if (arrEventsToDisplay) {
            arrEventsToDisplay.forEach(event => {
                if(!objEvents[event.eventId]) {
                    dispatch(eventsActions.fetchEventById(event.eventId));
                }
            });
        }
    }, [dispatch, arrEventsToDisplay, objEvents])


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
                        <div className="event_long_card_container__title">Orders</div>
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
                                                            {objEvents[event.eventId].title}
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