import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const TableCell = ({ className, text, type, onClick }) => {
  const Element = type;
  return (
    <Element
      className={cx(
        styles.cell,
        className,
      )}
      onClick={onClick}
    >
      {text}
    </Element>
  );
};

TableCell.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

TableCell.defaultProps = {
  type: 'td',
};

export default TableCell;
