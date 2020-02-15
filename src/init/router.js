import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import AppLayout from 'src/layout/app';
import Login from 'src/layout/login';

/* Demos */
import { Welcome } from 'src/page/welcome';
import { Apps } from 'src/page/apps';
import { AppsAdd } from 'src/page/apps-add';
import { Maintenance } from 'src/page/maintenance';
import { Notifications } from 'src/page/notifications';
import { NotificationsAdd } from 'src/page/notifications-add';
import { QuickTasks } from 'src/page/quicktasks';
/* End Demos */

import { NotFound } from 'src/page/not-found';

// Redirect is got GH pages and can be deleted for forked projects
const redirect = <Redirect from="/react-webpack-skeleton" to="/" />;

export const AppRouter = (
  <Router history={browserHistory}>
    {redirect}
    <Route path='/login' component={Login} />
    <Route component={AppLayout}>
      <Route path='/' component={Welcome} />
      <Route path='/apps' component={Apps} />
      <Route path='/apps-add' component={AppsAdd} />
      <Route path='/maintenance' component={Maintenance} />
      <Route path='/notifications' component={Notifications} />
      <Route path='/notifications-add' component={NotificationsAdd} />
      <Route path='/quicktasks' component={QuickTasks} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
