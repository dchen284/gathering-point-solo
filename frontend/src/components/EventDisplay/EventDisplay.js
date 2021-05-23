//external imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//internal imports
import * as eventActions from '../../store/event';

export default function EventDisplay() {

    //hooks
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);


    //useEffects
    useEffect( () => {
        dispatch(eventActions.fetchEvents()).then(() => setIsLoaded(true));
    }, [dispatch]);

    //get the event
    const event = useSelector( state => state.events[eventId] );
    console.log('event', event);

    return (
        <>
            <div>gab</div>
            {isLoaded && (
                <>
                    <div>heyo {event.id}</div>
                    <div>gee {event.title}</div>
                </>
            )}
        </>
    );
}