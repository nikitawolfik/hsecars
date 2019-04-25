import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const Card = ({ children, customStyle, shadow1 }) => (
  <div
    className={cx(styles.container, {
      [styles.shadow1]: shadow1,
    }, customStyle)}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.string,
  shadow1: PropTypes.bool,
};

export default Card;
