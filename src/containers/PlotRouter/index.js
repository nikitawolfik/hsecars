import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ListMenu } from 'components';

import { Histograms, Bars, AveragePrice } from './components';
import styles from './styles.module.scss';

const PlotRouter = ({ match: { path, url }, location: { pathname } }) => {
  const currentRoute = pathname.split('/')[2];
  return (
    <div className={styles.container}>
      <div className={styles.menuWrapper}>
        <ListMenu
          title="Графики"
          items={[
            { id: 'histograms', name: 'Histograms', to: `${path}/histograms` },
            { id: 'bars', name: 'Bar Charts', to: `${path}/bars` },
            { id: 'averages', name: 'Average Prices', to: `${path}/averages` },
          ]}
          selectedId={currentRoute}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Switch>
          <Route path={`${path}/histograms`} component={Histograms} />
          <Route path={`${path}/bars`} component={Bars} />
          <Route path={`${path}/averages`} component={AveragePrice} />
          <Redirect to={`${path}/histograms`} />
        </Switch>
      </div>
    </div>
  );
};

export default PlotRouter;
