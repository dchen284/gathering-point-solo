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


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );


    dispatch(sessionActions.login({ credential, password }))
      .then( ()=> setShowModal(false) )
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );

  };

  return (

      <div className="form-container">
        <form className="form-container__inputs" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="errors" key={idx}>{error}</li>
            ))}
          </ul>
          <h2>Log In</h2>
          <div className='form-input'>
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
          <div className='form-input'>
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


  );
}

export default LoginForm;