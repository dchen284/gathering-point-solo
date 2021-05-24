import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from './EventForm';

function EventFormModal({ formAction }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="pure-button" onClick={() => setShowModal(true)}>{`${formAction} Event`}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EventForm formAction={formAction} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EventFormModal;