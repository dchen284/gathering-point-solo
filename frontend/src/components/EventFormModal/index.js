import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';

function EventFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="pure-button" onClick={() => setShowModal(true)}>Create Event</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EventForm />
        </Modal>
      )}
    </>
  );
}

export default EventFormModal;