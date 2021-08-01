//external imports
import { useDispatch } from 'react-redux';
// import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//internal imports
import * as eventsActions from '../../store/events';
// import * as ticketsActions from '../../store/tickets';

export default function DeleteEventButton() {

    //hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();
    // const sessionUser = useSelector( (state) => state.session.user );
    // const [isDeleted, setIsDeleted] = useState(false);



    function activateDeleteButton() {
        // dispatch(ticketsActions.fetchTicketsToDeleteFromStore(eventId));
        dispatch(eventsActions.fetchEventToDelete(eventId));
        history.push('/');
        // setIsDeleted(true);
    }

    return (
        <>
            {/* { isDeleted ? <Redirect to={`/`}/> : null } */}
            <button
                className={`pure-button`}
                onClick={activateDeleteButton}
            >Delete Event</button>
        </>
    );
}