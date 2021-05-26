//external imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//internal imports
import './EventCardDisplay.css';
import EventCard from '../EventCard';
import * as eventsActions from '../../store/events';

export default function EventCardDisplay() {

    //hooks
    const dispatch = useDispatch();
    const arrEvents = useSelector((state) => Object.values(state.events) )
    const reversed = arrEvents.reverse();
    const numEventsToShow = 8;
    let arrEventsToShow;
    if (reversed.length < numEventsToShow) {
        arrEventsToShow = reversed;
    } else {
        arrEventsToShow = reversed.slice(0, numEventsToShow);
    }


    useEffect( () => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch])


    return (
        <>
            <p>Tournaments</p>
            <div className="eventCardDisplay">
                {arrEventsToShow.map( (event) => {
                    return <EventCard key={`${event.id}`} event={event}/>
                })}
            </div>
        </>
    );
}