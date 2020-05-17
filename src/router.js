import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import Root from './components/root/Index';
import Login from './pages/login/Index';
import Home from './pages/home/Index';

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Root>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Root>
      </Switch>
    </Router>
  );
}
export default RouterConfig;
