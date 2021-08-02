//external imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//internal imports
import './EventCardDisplay.css';
import EventCard from '../EventCard';
import * as categoriesActions from '../../store/category';
import * as eventsActions from '../../store/events';

export default function EventCardDisplay() {

    //hooks
    const dispatch = useDispatch();
    const arrEvents = useSelector((state) => Object.values(state.events) );
    const arrCategories = useSelector((state) => Object.values(state.categories));
    const reversed = arrEvents.reverse();
    // const numEventsToShow = 8;
    // let arrEventsToShow;
    // if (reversed.length < numEventsToShow) {
    //     arrEventsToShow = reversed;
    // } else {
    //     arrEventsToShow = reversed.slice(0, numEventsToShow);
    // }
    let arrEventsToShow = reversed;

    useEffect( () => {
        dispatch(eventsActions.fetchEvents());
        dispatch(categoriesActions.fetchGetCategories());
    }, [dispatch])


    return (
        <>
            <div className='category-bar'>
                {arrCategories.map( (category) => {
                        return <div key={category.id}>{category.categoryName}</div>
                })}
            </div>
            <div className='event-card-display'>
                <h2 className='event-card-display--title'>Tournaments in Houston</h2>
                <ul className='event-card-display--tabs-container'>
                    <li className='event-card-display--tab'>Standard</li>
                    <li className='event-card-display--tab'>Draft</li>
                </ul>
                <div className="event-card-display--grid">
                    {arrEventsToShow.map( (event) => {
                        return <EventCard key={`${event.id}`} event={event}/>
                    })}
                </div>

            </div>
        </>
    );
}