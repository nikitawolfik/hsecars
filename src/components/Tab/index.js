import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../Button';

import styles from './styles.module.scss';

const Tab = ({ title, to, selected }) => (
  <div className={styles.wrapper}>
    <Button
      element="link"
      to={to}
      title={title}
      customTextStyle={cx(styles.tab, { [styles.selected]: selected })}
    />
  </div>
);

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Tab;
