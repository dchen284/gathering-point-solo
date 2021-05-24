//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';
import BookmarkButton from '../BookmarkButton';
import DeleteEventButton from '../DeleteEventButton';

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
                    <div>{event.title}</div>
                    <div>{event.organizerName}</div>
                    <div>{event.eventBody}</div>
                    <div>{event.startTime}</div>
                    <div>{event.endTime}</div>
                    <div>Register Here</div>
                    <button className={`pure-button`}>Update Event</button>
                    <DeleteEventButton />
                    <BookmarkButton />
                </>
            )}
        </>
    );
}