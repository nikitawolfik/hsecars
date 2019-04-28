import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Regression, PlotRouter } from 'containers';

import { HeaderMenu } from './components';


import styles from './styles.module.scss';


const LayoutRouter = () => (
  <div className={styles.main}>
    <HeaderMenu />
    <div className={styles.content}>
      <Switch>
        <Route path="/regression" component={Regression} />
        <Route path="/plots" component={PlotRouter} />
        <Redirect to="/regression" />
      </Switch>
    </div>
  </div>
);

export default LayoutRouter;
