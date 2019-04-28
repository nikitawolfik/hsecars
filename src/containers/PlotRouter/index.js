import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ListMenu } from 'components';

import { Histograms } from './components';
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
          ]}
          selectedId={currentRoute}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Switch>
          <Route path={`${path}/histograms`} component={Histograms} />
          <Redirect to={`${path}/histograms`} />
        </Switch>
      </div>
    </div>
  );
};

export default PlotRouter;
