//external imports
import React, { useEffect, useState } from 'react';
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
    const [shownCategoryId, setShownCategoryId] = useState(0);

    // const numEventsToShow = 8;
    // let arrEventsToShow;
    // if (reversed.length < numEventsToShow) {
    //     arrEventsToShow = reversed;
    // } else {
    //     arrEventsToShow = reversed.slice(0, numEventsToShow);
    // }


    useEffect( () => {
        dispatch(eventsActions.fetchEvents());
        dispatch(categoriesActions.fetchGetCategories());
    }, [dispatch])

    let arrEventsToShow;
    shownCategoryId ?
        arrEventsToShow = arrEvents.filter(event => event.categoryId === shownCategoryId).reverse() :
        arrEventsToShow = arrEvents.reverse();

    function showEventsByCategory(e) {
        const clickedCategoryId = +(e.target.id).slice('category-bar-tag#'.length);
        setShownCategoryId(clickedCategoryId);
    }

    return (
        <>
            <div className='event-card-display'>
                <h2 className='event-card-display--title'>Tournaments in Houston</h2>
                <div className='event-card-display--category-bar'>
                    <div
                    id='category-bar-tag#0'
                    className={shownCategoryId === 0 ? 'event-card-display--category selected' : 'event-card-display--category'}
                    onClick={(e) => showEventsByCategory(e)}
                    >
                        All
                    </div>
                    {arrCategories.map( (category) => {
                            return (
                                <div
                                id={`category-bar-tag#${category.id}`}
                                key={category.id}
                                className={shownCategoryId === category.id ? 'event-card-display--category selected' : 'event-card-display--category'}
                                onClick={(e) => showEventsByCategory(e)}
                                >
                                    {category.categoryName}
                                </div>
                                )
                    })}
                </div>
                <div className="event-card-display--grid">
                    {arrEventsToShow.map( (event) => {
                        return <EventCard key={`${event.id}`} event={event}/>
                    })}
                    {
                        arrEventsToShow.length ? null :
                        <div className="event-card-display--empty">No events of that category can be found.</div>
                    }
                </div>

            </div>
        </>
    );
}