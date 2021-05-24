//external imports
import { useDispatch } from 'react-redux';
// import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';

export default function DeleteEventButton() {

    //hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();
    // const [isLoaded, setIsLoaded] = useState(false);

    function activateDeleteButton() {
        dispatch(eventsActions.fetchEventToDelete(eventId));
        history.push('/');
    }

    return (
        <button
            className={`pure-button`}
            onClick={activateDeleteButton}
        >Delete Event</button>
    );
}