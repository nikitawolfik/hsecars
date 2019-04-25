/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import { Loader, WindowResizer } from 'components';
import { MiddlebarContextMobile } from 'context';
import { md } from 'utils/breakpoints';

import ToggleIconSrc from 'assets/svg/chevron-left.svg';
import CloseIconSrc from 'assets/svg/close.svg';

import styles from './styles.module.scss';


const MiddleBarMobile = ({ selectedMenu, children, loader }) => (
  <WindowResizer>
    {(width) => {
      const isMobile = width < md;
      return (
        <MiddlebarContextMobile.Consumer>
          {([sidebar, setSidebarOpened]) => (
            <Transition
              in={sidebar}
              timeout={350}
              unmountOnExit
              mountOnEnter
            >
              {status => (
                <div
                  className={cx(
                    styles.container,
                    {
                      [styles.hidden]: !isMobile,
                      [styles.innerEntering]: isMobile && status === 'entering',
                      [styles.innerExiting]: isMobile && status === 'exiting',
                    },
                  )}
                >
                  <div
                    className={cx(
                      styles.innerSidebar,
                      {
                        [styles.innerEntering]: status === 'entering',
                        [styles.innerExiting]: status === 'exiting',
                      },
                    )}
                  >
                    <div className={styles.toggleContainer}>
                      <h2 className={styles.sidebarHeader}>{selectedMenu}</h2>
                      <div className={styles.toggle}>
                        <img
                          src={isMobile ? CloseIconSrc : ToggleIconSrc}
                          className={styles.toggleIcon}
                          onClick={() => setSidebarOpened(false)}
                        />
                      </div>
                    </div>
                    <div className={styles.innerSidebarContent}>
                      {!loader ? children : (
                        <div className={styles.loader}>
                          <Loader loading block />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          )}
        </MiddlebarContextMobile.Consumer>
      );
    }}
  </WindowResizer>
);

MiddleBarMobile.defaultProps = {
  loader: false,
};

MiddleBarMobile.propTypes = {
  selectedMenu: PropTypes.string,
  children: PropTypes.node.isRequired,
  loader: PropTypes.bool,
};


export default withRouter(MiddleBarMobile);
