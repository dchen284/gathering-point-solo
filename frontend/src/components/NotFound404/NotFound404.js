//External imports
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//Internal imports
import { Modal } from '../../context/Modal';
import EventForm from '../EventFormModal/EventForm';
import LoginForm from '../LoginFormModal/LoginForm';
import './NotFound404.css';

export default function NotFound404() {

    //hooks
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const sessionUser = useSelector( (state) => state.session.user );

    //functions
    function clickCreateAnEvent() {
        sessionUser ? setModalType('Create') : setModalType('Login');
        setShowModal(true);
    }

    //JSX
    return (
        <div className='not-found-container'>
            <p className='not-found--icon'><i className="fas fa-exclamation"></i></p>
            <p className='not-found--whoops'>
                Whoops, the page or event you are looking for was not found.
            </p>
            <p className='not-found--directions'>
                If you feel this message is in error, please let us know.
            </p>
            <div className='not-found--buttons'>
                <button
                className='btn-primary'
                onClick={clickCreateAnEvent}
                >
                    Create An Event
                </button>
                {showModal && modalType === 'Create' && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm formAction='Create' setShowModal={setShowModal}/>
                </Modal>
                )}
                {showModal && modalType === 'Login' && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal}/>
                </Modal>
                )}
                <button
                className='btn-secondary'
                onClick={()=>{history.push('/')}}
                >
                    Find An Event
                </button>
            </div>

        </div>
    )
}