//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';
import BookmarkButton from '../BookmarkButton';
import DeleteEventButton from '../DeleteEventButton';
import EventFormModal from '../EventFormModal';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);


    //useEffects
    useEffect( () => {
        dispatch(eventsActions.fetchEventById(eventId)).then(() => setIsLoaded(true));
    }, [dispatch, eventId]);

    //get the event
    const event = useSelector( state => state.events[eventId] );

    return (
        <>
            {isLoaded && (
                <>
                    <div>Event Title: {event.title}</div>
                    <div>Organizer Name: {event.organizerName}</div>
                    <div>Event Description: {event.eventBody}</div>
                    <div>Event Start Time: {event.startTime}</div>
                    <div>Event End Time: {event.endTime}</div>
                    <div>Register Here</div>
                    <EventFormModal formAction='Update'/>
                    <DeleteEventButton />
                    <BookmarkButton />
                </>
            )}
        </>
    );
}