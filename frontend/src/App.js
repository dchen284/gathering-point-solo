//external imports
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//internal imports
import EventCardDisplay from './components/EventCardDisplay';
import EventDisplay from './components/EventDisplay';
import Footer from './components/Footer';
// import LoginFormPage from './components/LoginFormPage';
import Navigation from "./components/Navigation";
import TicketsDisplay from "./components/TicketsDisplay";
// import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';

function App() {

  //hooks
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1>Hello from App</h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={`/`}>
            <EventCardDisplay />
          </Route>
          <Route path={`/events/:eventId(\\d+)`}>
            <EventDisplay />
          </Route>
          <Route path={`/users/:userId(\\d+)/tickets`}>
            <TicketsDisplay />
          </Route>
          <Route>
            <div>404: Not Found</div>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
