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

    //get the event
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector( state => state.events[eventId] );

    //useEffects
    useEffect( () => {
        dispatch(eventsActions.fetchEventById(eventId)).then(() => setIsLoaded(true));
    }, [dispatch, eventId]);

    let boolOwnsEvent = false;
    if (sessionUser && event) {
        if (sessionUser.id === event.ownerId)
            {boolOwnsEvent = true}
    }

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
                    {
                        boolOwnsEvent ?
                        <>
                            <EventFormModal formAction='Update'/>
                            <DeleteEventButton />
                        </>
                        : null
                    }
                    <BookmarkButton />
                </>
            )}
        </>
    );
}