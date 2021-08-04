//external imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import * as sessionActions from '../../store/session';
import './BookmarkButton.css'

export default function BookmarkButton({ borderStyle, eventId }) {

    //hooks
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [hasBookmark, setHasBookmark] = useState(false);
    const sessionUser = useSelector( (state) => state.session.user );

    // let bookmark = null;
    // if (sessionUser && sessionUser.UserBookmarks) {bookmark = sessionUser.UserBookmarks[eventId]}

    // const bookmark = useSelector( (state) => state.session.user.UserBookmarks[eventId] );


    useEffect(()=>{
        if (!sessionUser) {setHasBookmark(false)}
        else {
            if (sessionUser?.UserBookmarks[eventId]) {setHasBookmark(true)}
        }
    },[eventId, sessionUser])

    function clickBookmarkButton() {
        if (sessionUser) {
            if (!hasBookmark) {dispatch(sessionActions.fetchAddBookmark(eventId, sessionUser.id))}
            else {dispatch(sessionActions.fetchRemoveBookmark(eventId, sessionUser.id))}
            setHasBookmark((prevHasBookmark) => !prevHasBookmark);
        }
        else {
            setShowModal(true);
        }
    }

    return (
        <>
            <div
            className={borderStyle === "grey" ? "bookmark-button border-grey" : "bookmark-button"}
            onClick={clickBookmarkButton}
            >
                <i className={hasBookmark ? "fas fa-heart" : "far fa-heart"}></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}