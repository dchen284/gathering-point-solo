import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import '../Navigation/Navigation.css';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
      className="nav__button"
      onClick={() => setShowModal(true)}
      >
        Sign Up as New User
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;