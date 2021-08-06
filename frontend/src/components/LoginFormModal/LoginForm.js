//external imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
//internal imports
import './LoginForm.css';
import * as sessionActions from "../../store/session";
import DemoUserButton from "../DemoUserButton";

function LoginForm({ setShowModal, loginWarning }) {
  const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(loginWarning ? [loginWarning] : []);

  const [errCredential, setErrCredential] = useState("");
  const [errPassword, setErrPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setErrCredential("");
    setErrPassword("");

    if (!credential) {setErrCredential('Please provide a valid email or username.')}
    if (!password) {setErrPassword('Please provide a password.')}

    if (credential && password) {
      dispatch(sessionActions.login({ credential, password }))
        .then( ()=> setShowModal(false) )
        .catch(
          async (res) => {
            setErrCredential("");
            setErrPassword("");
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
    }


  };

  return (
      <>
        <div className="form-container">
          <form className="form-container__inputs" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>{error}</li>
              ))}
            </ul>
            <h2>Log In</h2>
            <div className='form-input-container'>
              <div className={errCredential ? 'form-input--error': 'form-input'}>
                <label>
                  Username or Email
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    // required
                  />
                </label>
              </div>
              <div className='form-frontend-error'>{errCredential}</div>
            </div>

            <div className='form-input-container'>
              <div className={errPassword ? 'form-input--error': 'form-input'}>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                  />
                </label>
              </div>
              <div className='form-frontend-error'>{errPassword}</div>
            </div>
            <button className="btn-primary" type="submit">Log In</button>
            <DemoUserButton setShowModal={setShowModal}/>
          </form>

          <div className='form-container__side-section'>
            <div className='form-container__side-X' onClick={() => setShowModal(false)}>
              <i className="fas fa-times" />
            </div>
            <img className='form-container__side-image' alt="quill" src="/images/stx-82-poet-s-quill.jpeg" />
            <div className='form-container__side-image-caption'>
              <p>Poet's Quill, illustrated by Anna Fehr</p>
              <p>From Magic: the Gathering, by Wizards of the Coast</p>
            </div>
          </div>
        </div>
      </>

  );
}

export default LoginForm;

    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );