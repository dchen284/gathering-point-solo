//external imports
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
//internal imports
import './LoginForm.css';
import { login } from '../../store/session';

export default function LoginFormPage() {

    //local state variables
    const [formUsername, setFormUsername] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    //hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );

    // async function onSubmit(event) {
    //     event.preventDefault();

    //     const userToLogin = {
    //         credential: formUsername,
    //         password: formPassword,
    //     }

    //     const responseFromLogin = await dispatch(login(userToLogin));
    //     // const dataFromLogin = await responseFromLogin.json();
    //     if (responseFromLogin.ok) {
    //         console.log('ok', responseFromLogin);
    //     }
    //     else {
    //         console.log('errors', responseFromLogin);
    //     }
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors([]);

        const userToLogin = {
            credential: formUsername,
            password: formPassword,
        }

        return dispatch(login(userToLogin))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setFormErrors(data.errors);
            // console.log('data', data.errors);
          });


      }

    if (sessionUser) return <Redirect to={`/`}/>;

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {formErrors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
            </ul>
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter a username (not email)"
                    value={formUsername}
                    onChange={ (event) => setFormUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={formPassword}
                    onChange={ (event) => setFormPassword(event.target.value)}
                />
            </div>
            <div>
                <input
                    type="submit"
                    value="Log-in"
                />
            </div>
        </form>
    );
}
