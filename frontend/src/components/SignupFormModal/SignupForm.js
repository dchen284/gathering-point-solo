//external imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//internal imports
import './SignupForm.css';
import * as sessionActions from "../../store/session";
import DemoUserButton from "../DemoUserButton";


function SignupForm() {
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
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="form-container">
      <form className="form-container__inputs" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
        <button className="pure-button" type="submit">Sign Up</button>
        <DemoUserButton />
      </form>
      <div className='form-container__side-section'>
          <img className='form-container__side-image' alt="quill" src="/images/stx-198-lorehold-apprentice.jpeg" />
          <div className='form-container__side-image-caption'>Lorehold Apprentice, illustrated by Manuel Castañón</div>
          <div className='form-container__side-image-caption'>From Magic: the Gathering, by Wizards of the Coast</div>
      </div>
    </div>
  );
}

export default SignupForm;