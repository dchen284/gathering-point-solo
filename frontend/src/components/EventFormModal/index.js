import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';
import '../Navigation/Navigation.css';

function EventFormModal({ formAction }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
      className="nav__button nav__button--create_event"
      onClick={() => setShowModal(true)}
      >
          <i className="fas fa-plus"></i>
          <div>Create an event</div>
        {/* {`${formAction} Event`} */}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EventForm formAction={formAction} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EventFormModal;