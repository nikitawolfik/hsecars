/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import { Loader, WindowResizer } from 'components';
import { MiddlebarContext } from 'context/MiddlebarContext';
import { md } from 'utils/breakpoints';

import ToggleIconSrc from 'assets/svg/chevron-left.svg';

import styles from './styles.module.scss';


const MiddleBar = ({ selectedMenu, children, loader }) => (
  <WindowResizer>
    {width => (
      <MiddlebarContext.Consumer>
        {([sidebar, setSidebarOpened]) => (
          <Transition
            in={sidebar}
            timeout={{
              enter: 400,
              exit: 300,
            }}
            unmountOnExit
          >
            {status => (
              <div
                className={cx(
                  styles.container,
                  {
                    [styles.entering]: status === 'entering',
                    [styles.exiting]: status === 'exiting',
                    [styles.hidden]: width < md,
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
                        src={ToggleIconSrc}
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
      </MiddlebarContext.Consumer>
    )}
  </WindowResizer>
);

MiddleBar.defaultProps = {
  loader: false,
};

MiddleBar.propTypes = {
  selectedMenu: PropTypes.string,
  children: PropTypes.node.isRequired,
  loader: PropTypes.bool,
};


export default withRouter(MiddleBar);
