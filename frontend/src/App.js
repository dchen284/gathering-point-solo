//external imports
import { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//internal imports
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import { restoreSessionUser } from './store/session';

function App() {

  //hooks
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    dispatch(restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <h1>Hello from App</h1>
      <Link to="/login">Log-In</Link>


      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
