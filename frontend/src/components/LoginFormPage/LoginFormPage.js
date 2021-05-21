//external imports
import { useDispatch } from 'react-redux';
import { useState } from 'react';
//internal imports
import { login } from '../../store/session';

export default function LoginFormPage() {

    //local state variables
    const [formUsername, setFormUsername] = useState();
    const [formPassword, setFormPassword] = useState();

    //hooks
    const dispatch = useDispatch();


    function onSubmit(event) {
        event.preventDefault();

        const userToLogin = {
            credentials: formUsername,
            password: formPassword,
        }

        const resultOfLogin = dispatch(login(userToLogin));
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                {}
            </div>
            <div>
                <label for="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter a username (not email)"
                    value={formUsername}
                    onChange={ (event) => setFormUsername(event.target.value)}
                />
            </div>
            <div>
                <label for="password">Password: </label>
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
