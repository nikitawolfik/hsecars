import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Hello, Regression, Plots } from 'containers';

import { HeaderMenu } from './components';


import styles from './styles.module.scss';


const LayoutRouter = () => (
  <div className={styles.main}>
    <HeaderMenu />
    <Switch>
      <Route path="/hello" component={Hello} />
      <Route path="/regression" component={Regression} />
      <Route path="/plots" component={Plots} />
      <Redirect to="/regression" />
    </Switch>
  </div>
);

export default LayoutRouter;
