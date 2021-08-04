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
import './TicketsDisplay.css';

export default function TicketsDisplay() {

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    let arrTickets;
    if (sessionUser) {arrTickets = Object.values(sessionUser.UserTickets)}
    // const arrTickets = useSelector( (state) => Object.values(state.session.user.UserTickets) );
    const objEvents = useSelector((state) => state.events );
    const { userId } = useParams();
    // const [isLoaded, setIsLoaded] = useState(false);

    // console.log('>>>>>>arrTickets', arrTickets);
    // console.log('+++++++objEvents', objEvents);
    // console.log('@@@@@', isLoaded);

    //useEffects
    //For each ticket, if that ticket's event is not in the store, fetch that event
    useEffect( () => {
        arrTickets.forEach(ticket => {
            if(!objEvents[ticket.eventId]) {
                dispatch(eventsActions.fetchEventById(ticket.eventId));
            }
        });

    }, [dispatch, arrTickets, objEvents])


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
            <div>404: Not Found</div>
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
                            arrTickets.map( (ticket) => {
                                if (objEvents[ticket.eventId]) {
                                    return (
                                        <div key={`${objEvents[ticket.eventId].id}`}>
                                            <Link to={`/events/${objEvents[ticket.eventId].id}`}>
                                                <div className='event_long_card'>
                                                    <div className='event__left_date'>
                                                        <div className='event__month'>
                                                            {getMonth(objEvents[ticket.eventId].startTime)}
                                                        </div>
                                                        <div className='event__day'>
                                                            {getDay(objEvents[ticket.eventId].startTime)}
                                                        </div>
                                                    </div>

                                                    <img
                                                    alt='Event Splash'
                                                    className='event__image'
                                                    src=
                                                        {
                                                            objEvents[ticket.eventId].imgUrl ?
                                                            objEvents[ticket.eventId].imgUrl :
                                                            "/images/thb-278-plains.jpeg"
                                                        }
                                                    />
                                                    <div className='event__text'>
                                                        <div className='event__title'>
                                                            {objEvents[ticket.eventId].title}
                                                        </div>
                                                        <div className='event__start-time'>
                                                            {formatTime(objEvents[ticket.eventId].startTime)}
                                                        </div>
                                                        <div className='event__order-time'>
                                                            <span>Order placed at </span>
                                                            {formatTime(objEvents[ticket.eventId].createdAt)}
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

/*
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Event ID#</th>
                            <th>Event Title</th>
                            <th>Event Start Time</th>
                            <th>Cancel Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        arrTickets.map( (ticket) => {
                            if (objEvents[ticket.eventId]) {
                                return (
                                    <tr key={`${objEvents[ticket.eventId].id}`}>
                                        <td>{objEvents[ticket.eventId].id}</td>
                                        <td>
                                            <Link to={`/events/${objEvents[ticket.eventId].id}`}>
                                                {objEvents[ticket.eventId].title}
                                            </Link>
                                        </td>
                                        <td>{formatTime(objEvents[ticket.eventId].startTime)}</td>
                                        <td>
                                            <TicketButton
                                                eventId={ticket.eventId}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            else {
                                return null;
                            }

                        })
                    }
                    </tbody>
                </table>
*/