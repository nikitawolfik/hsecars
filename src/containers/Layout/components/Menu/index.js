/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import cx from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';

import LogoIconSrc from 'assets/svg/logo.svg';
import MyProjectsIconSrc from 'assets/svg/my-projects.svg';
import ManagedProjectsIconSvg from 'assets/svg/managed-projects.svg';
import GuestProjectsIconSrc from 'assets/svg/guest-projects.svg';
import ManagementIconSrc from 'assets/svg/management.svg';
import SettingsIconSrc from 'assets/svg/settings.svg';
import { WindowResizer } from 'components';
import { MiddlebarContext } from 'context/MiddlebarContext';
import { md } from 'utils/breakpoints';


import styles from './styles.module.scss';

const mediumItems = [
  {
    name: 'Мои аккаунты',
    image: MyProjectsIconSrc,
    to: '/projects/accounts',
  },
  {
    name: 'Управляемые проекты',
    image: ManagedProjectsIconSvg,
    to: '/projects/managed',
  },
  {
    name: 'Гостевые проекты',
    image: GuestProjectsIconSrc,
    to: '/projects/guest',
  },
];

const realMenu = mediumItems.map(el => el.name);

const bottomItems = [
  {
    name: 'Менеджмент',
    image: ManagementIconSrc,
    to: '/management',
  },
  {
    name: 'Настройки',
    image: SettingsIconSrc,
    to: '/settings',
  },
];

const Menu = (props) => {
  const renderIcon = setSidebarOpened => ({ name, image, to = '/' }, index, array) => {
    const {
      location: { pathname },
    } = props;
    const handleClick = (e) => {
      if (pathname.includes(to)) {
        e.preventDefault();
      }
      if (realMenu.includes(name)) {
        setSidebarOpened(true);
      }
    };

    return (
      <NavLink
        key={name}
        activeClassName={styles.selectedMenu}
        className={cx(styles.iconWrapper, {
          [styles.withMargin]: array.length - 1 === index,
        })}
        to={to}
        onClick={handleClick}
      >
        <img
          src={image}
          className={styles.icon}
        />
      </NavLink>
    );
  };

  return (
    <WindowResizer>
      {width => (
        <MiddlebarContext.Consumer>
          {([, setSidebarOpened]) => (
            <div className={cx(
              styles.container,
              { [styles.hidden]: width < md },
            )}
            >
              <div className={styles.top}>
                <div className={styles.logoWrapper}>
                  <img src={LogoIconSrc} className={styles.iconLogo} />
                </div>
              </div>
              <div className={styles.medium}>
                {mediumItems.map(renderIcon(setSidebarOpened))}
              </div>
              <div className={styles.bottom}>
                {bottomItems.map(renderIcon(setSidebarOpened))}
              </div>
            </div>

          )}
        </MiddlebarContext.Consumer>


      )}
    </WindowResizer>
  );
};

Menu.propTypes = {
  location: PropTypes.shape({}),
};

export default compose(
  memo,
  withRouter,
)(Menu);
