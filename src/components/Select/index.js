import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ChevronDown from 'assets/svg/chevron-down.svg';
import { getFieldError } from 'utils/validation';

import styles from './styles.module.scss';

const Select = ({ input, meta, values, label }) => {
  const error = getFieldError(meta);

  return (
    <div>
      <div className={styles.container}>
        <label
          className={cx(styles.label, {
            [styles.withErrors]: error,
          })}
          htmlFor={input.name}
        >
          {label}
        </label>
        <div className={styles.inputContainer}>
          <select {...input} value={String(input.value)} className={styles.select}>
            <option value="">Выберите один вариант</option>
            {values.map(({ value, name }) => (
              <option key={value} value={value}>{name}</option>
            ))}
          </select>
          <img src={ChevronDown} className={styles.icon} />
        </div>
      </div>
      {error && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
  })).isRequired,
};

export default Select;
