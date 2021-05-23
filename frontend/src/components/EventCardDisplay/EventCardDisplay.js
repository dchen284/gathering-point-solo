//external imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//internal imports
import EventCard from '../EventCard';
import * as eventActions from '../../store/event';

export default function EventCardDisplay() {

    //hooks
    const dispatch = useDispatch();
    const arrEvents = useSelector((state) => Object.values(state.events) )


    useEffect( () => {
        dispatch(eventActions.fetchEvents());
    }, [dispatch])


    return (
        <div className="eventCardDisplay">
            {arrEvents.map( (event) => {
                return <EventCard key={`${event.id}`} event={event}/>
            })}
        </div>
    );
}