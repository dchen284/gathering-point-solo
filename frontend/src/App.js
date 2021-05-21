import { Link, Route, Switch } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Link to="/login">Log-In</Link>


      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
