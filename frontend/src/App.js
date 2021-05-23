//external imports
import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//internal imports
import EventCardDisplay from './components/EventCardDisplay';
import Footer from './components/Footer';
// import LoginFormPage from './components/LoginFormPage';
import Navigation from "./components/Navigation";
// import SignupFormPage from './components/SignupFormPage';
import { restoreSessionUser } from './store/session';

function App() {

  //hooks
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    dispatch(restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1>Hello from App</h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
        </Switch>
      )}
        <EventCardDisplay />
        <Footer />
    </>
  );
}

export default App;
