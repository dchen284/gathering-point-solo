//external imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//internal imports
import EventCard from '../EventCard';
import * as eventsActions from '../../store/events';

export default function EventCardDisplay() {

    //hooks
    const dispatch = useDispatch();
    const arrEvents = useSelector((state) => Object.values(state.events) )
    const reversed = arrEvents.reverse();

    useEffect( () => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch])


    return (
        <div className="eventCardDisplay">
            {reversed.map( (event) => {
                return <EventCard key={`${event.id}`} event={event}/>
            })}
        </div>
    );
}