//external imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//internal imports
import './SignupForm.css';
import * as sessionActions from "../../store/session";
import DemoUserButton from "../DemoUserButton";


function SignupForm({setShowModal}) {
  const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsToPrint = [];
    if (!email.includes('@'))
      {errorsToPrint.push('Please provide a valid email.')}
    if (username.length < 4 || username.length > 30)
      {errorsToPrint.push('Username must have between 4 to 30 characters.')}
    if (password.length < 5)
      {errorsToPrint.push('Password must have 5 characters or more.')}
    if (password !== confirmPassword)
      {errorsToPrint.push('Password and Confirm Password do not match.')}

    if (!errorsToPrint.length) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(errorsToPrint);
  };

  return (
    <div className="form-container">
      <form className="form-container__inputs" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
        </ul>
        <h2>Sign Up</h2>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="green">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="btn-primary" type="submit">Sign Up</button>
        <DemoUserButton />
      </form>
      <div className='form-container__side-section'>
          <div className='form-container__side-X' onClick={() => setShowModal(false)}>
            <i className="fas fa-times" />
          </div>
          <img className='form-container__side-image' alt="quill" src="/images/stx-198-lorehold-apprentice.jpeg" />
          <div className='form-container__side-image-caption'>
            <p>Lorehold Apprentice, illustrated by Manuel Castañón</p>
            <p>From Magic: the Gathering, by Wizards of the Coast</p>
          </div>
      </div>
    </div>
  );
}

export default SignupForm;