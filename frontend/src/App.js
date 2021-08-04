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
// import TicketsDisplay from "./components/TicketsDisplay";
// import BookmarksDisplay from "./components/BookmarksDisplay";
import UserDataDisplay from './components/UserDataDisplay/UserDataDisplay';
import SearchResults from "./components/SearchResults";
import NotFound404 from './components/NotFound404';
// import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
// import CreateUser from './components/CreateUser';

function App() {

  //hooks
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  //state that is loaded when the app is loaded
  useEffect( () => {
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='page-wrapper'>
        <div className='page-wrapper--nav'>
          <Navigation isLoaded={isLoaded} />
        </div>
        {isLoaded && (
          <div className='page-wrapper--content'>
            <Switch>
              <Route exact path={`/`}>
                <EventCardDisplay />
              </Route>
              <Route path={`/events/:eventId(\\d+)`}>
                <EventDisplay />
              </Route>
              <Route path={`/users/:userId(\\d+)/tickets`}>
                <UserDataDisplay strDataType={'tickets'}/>
              </Route>
              <Route path={`/users/:userId(\\d+)/likes`}>
                <UserDataDisplay strDataType={'likes'}/>
              </Route>
              <Route path={`/search/:searchTerm`}>
                <SearchResults />
              </Route>
              <Route path={`/users/:userId(\\d+)/events`}>
                <UserDataDisplay strDataType={'events'}/>
              </Route>
              <Route>
                <NotFound404 />
              </Route>
            </Switch>
          </div>
        )}
        <div className='page-wrapper--footer'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
