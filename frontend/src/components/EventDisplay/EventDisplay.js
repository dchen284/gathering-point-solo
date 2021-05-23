//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import * as eventActions from '../../store/event';
import BookmarkButton from '../BookmarkButton';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);


    //useEffects
    useEffect( () => {
        dispatch(eventActions.fetchEventById(eventId)).then(() => setIsLoaded(true));
    }, [dispatch]);

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
                    <BookmarkButton />
                </>
            )}
        </>
    );
}