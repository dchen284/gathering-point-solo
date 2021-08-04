import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';
import './EventForm.css';
import '../Navigation/Navigation.css';

function EventFormModal({ formAction }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {formAction === 'Create' &&
        <div
        className="nav__button nav__button--create_event"
        onClick={() => setShowModal(true)}
        >
            <i className="fas fa-plus"></i>
            <div>Create an event</div>
        </div>
      }
      {formAction === 'Update' &&
        <div
        className="nav__button nav__button--create_event"
        onClick={() => setShowModal(true)}
        >
            <i className="fas fa-plus"></i>
            <div>Update Event</div>
        </div>
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EventForm formAction={formAction} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EventFormModal;