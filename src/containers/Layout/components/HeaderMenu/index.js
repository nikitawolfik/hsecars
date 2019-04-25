import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

const LINKS = [
  {
    name: 'Regression',
    to: '/regression',
  },
  {
    name: 'Plots',
    to: '/plots',
  },
];

const HeaderMenu = () => {
  return (
    <div className={styles.menuWrapper}>
      {LINKS.map(link => (
        <NavLink
          key={link.name}
          to={link.to}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default HeaderMenu;
