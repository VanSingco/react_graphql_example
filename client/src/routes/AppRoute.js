import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from '../component/App';
import Login from '../component/Login';
import Signup from '../component/Signup';

const AppRoute = () => {
      const token = !!localStorage.getItem('token')
      return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute currentUser={token} exact path="/" component={App} />
                <PublicRoute currentUser={token} path="/login" component={Login} />
                <PublicRoute currentUser={token} path="/signup" component={Signup} />
            </Switch>
        </BrowserRouter>
      );
}

export default AppRoute;

// Must be logged in for this route... Briefly shows '...' while loading account data rather than redirecting...
const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />;
      }}
    />
  );

  const PublicRoute = ({ component: Component, currentUser, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return !currentUser ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );