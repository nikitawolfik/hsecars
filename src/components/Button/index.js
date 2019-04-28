/* eslint-disable react/button-has-type */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Spinner from '../Spinner';
import styles from './styles.module.scss';

const Button = ({
  element,
  invertIcon,
  withTitle,
  withIcon,
  primary,
  transparent,
  medium,
  to,
  title,
  disabled,
  loading,
  customStyle,
  customTextStyle,
  icon,
  onClick,
  big,
  outline,
  type,
  secondary,
  style,
}) => {
  if (element === 'button') {
    return (
      <button
        type={type}
        className={cx(
          styles.container,
          transparent && styles.transparent,
          primary && styles.primary,
          secondary && styles.secondary,
          outline && styles.outline,
          medium && styles.medium,
          big && styles.big,
          disabled && styles.disabled,
          customStyle,
        )}
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && (
          <Spinner inverted />
        )}
        {(!loading && withTitle) && (
          <span
            className={cx(
              styles.text,
              (primary || secondary) && styles.white,
              customTextStyle,
            )}
          >
            {title}
          </span>
        )}
        {(!loading && withIcon) && (
          <img
            className={
              cx(
                styles.icon,
                { [styles.iconInverted]: invertIcon },
              )
            }
            src={icon}
          />
        )}
        {transparent && (
          <Fragment>
            <div className={styles.leftExtraShadow} />
            <div className={styles.rightExtraShadow} />
          </Fragment>
        )}
      </button>
    );
  }

  // link
  const linkChildren = (
    <Fragment>
      {withTitle && (
        <span
          className={cx(
            styles.text,
            primary && styles.white,
            customTextStyle,
          )}
        >
          {title}
        </span>
      )}
      {withIcon && (
        <img
          src={icon}
          className={
            cx(
              styles.icon,
              { [styles.iconInverted]: invertIcon },
            )
          }
        />
      )}
      {transparent && (
        <Fragment>
          <div className={styles.leftExtraShadow} />
          <div className={styles.rightExtraShadow} />
        </Fragment>
      )}
    </Fragment>
  );
  const linkProps = {
    className: cx(
      styles.container,
      transparent && styles.transparent,
      primary && styles.primary,
      outline && styles.outline,
      medium && styles.medium,
      big && styles.big,
      disabled && styles.disabled,
      customStyle,
    ),
    onClick,
  };

  return React.createElement(element === 'a' ? 'a' : Link, {
    ...linkProps,
    to: element !== 'a' ? to : undefined,
    href: element !== 'a' ? undefined : to,
    target: element !== 'a' ? undefined : '_blank',
  }, linkChildren);
};

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  element: PropTypes.oneOf(['link', 'button', 'a']),
  withTitle: PropTypes.bool,
  withIcon: PropTypes.bool,
  icon: PropTypes.any,
  primary: PropTypes.bool,
  transparent: PropTypes.bool,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  medium: PropTypes.bool,
  customStyle: PropTypes.string,
  customTextStyle: PropTypes.string,
  big: PropTypes.bool,
  outline: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  secondary: PropTypes.bool,
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  element: 'button',
  type: 'button',
  withTitle: true,
};

export default Button;
