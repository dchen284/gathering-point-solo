//external imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import * as sessionActions from '../../store/session';
import './TicketButton.css';


export default function TicketButton({ eventId }) {

    //hooks
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [hasTicket, setHasTicket] = useState(false);
    const sessionUser = useSelector( (state) => state.session.user );

    //useEffects
    useEffect( () => {
        if (!sessionUser) {setHasTicket(false)}
        if (sessionUser?.UserTickets) {setHasTicket(sessionUser.UserTickets[eventId])}
    }, [dispatch, eventId, sessionUser])

    //JavaScript


        // button callback function toggle
    function clickTicketButton() {
        if (sessionUser) {
            if (!hasTicket) {dispatch(sessionActions.fetchAddTicket(eventId, sessionUser.id))}
            else {dispatch(sessionActions.fetchRemoveTicket(eventId, sessionUser.id))}
            setHasTicket((prevHasTicket) => !prevHasTicket);
        }
        else {
            setShowModal(true);
        }

    }


    return (
        <>
            <button
                onClick={clickTicketButton}
                className={ hasTicket ? `btn-secondary btn-register-cancel` : `btn-register`}
            >
                {hasTicket ? 'Cancel Ticket' : 'Register'}
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}