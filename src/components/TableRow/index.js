import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const TableRow = ({ className, children }) => (
  <tr
    className={cx(
      styles.row,
      className,
    )}
  >
    {children}
  </tr>
);


TableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.node,
};


export default TableRow;
