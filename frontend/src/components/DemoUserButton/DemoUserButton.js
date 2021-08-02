//external imports
import React from "react";
import { useDispatch } from "react-redux";

//internal imports
import * as sessionActions from "../../store/session";

export default function DemoUserButton({setShowModal}) {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([]);

    function loginDemoUser(e) {
        e.preventDefault();
        if (setShowModal) {setShowModal(false)}
        return dispatch(sessionActions.login({ credential: 'Demo-lition' , password: 'password' })).catch(
        // return dispatch(sessionActions.loginDemoUser()).catch(
            async (res) => {
              // const data = await res.json();
              // if (data && data.errors) setErrors(data.errors);
            }
          );
    }

    return (
        <button className="pure-button" onClick={loginDemoUser} >Demo User</button>
    )
}