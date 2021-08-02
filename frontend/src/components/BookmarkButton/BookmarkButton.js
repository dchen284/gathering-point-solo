//external imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
// import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
// import * as ticketsActions from '../../store/tickets';
import './BookmarkButton.css'

export default function BookmarkButton({ eventId }) {

    //hooks
    const dispatch = useDispatch();

    const sessionUser = useSelector( (state) => state.session.user );

    let bookmark = null;
    if (sessionUser && sessionUser.UserBookmarks) {bookmark = sessionUser.UserBookmarks[eventId]}

    // const bookmark = useSelector( (state) => state.session.user.UserBookmarks[eventId] );
    const [hasBookmark, setHasBookmark] = useState(!!bookmark);

    function clickBookmarkButton() {
        if (sessionUser) {
            if (!hasBookmark) {dispatch(sessionActions.fetchAddBookmark(eventId, sessionUser.id))}
            else {dispatch(sessionActions.fetchRemoveBookmark(eventId, sessionUser.id))}
            setHasBookmark((prevHasBookmark) => !prevHasBookmark);
        }
        else {
            //show modal
        }
    }

    return (
        <div
        className="bookmark-button"
        onClick={clickBookmarkButton}
        >
            <i className={hasBookmark ? "fas fa-heart" : "far fa-heart"}></i>
        </div>
    );
}