import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

import BlueChevronIconSrc from 'assets/svg/back-blue.svg';
import ChevronIconSrc from 'assets/svg/back.svg';

import { Button, Tab, WindowResizer } from 'components';
import { md } from 'utils/breakpoints';

import styles from './styles.module.scss';

const ListMenu = ({ items, title, selectedId }) => (
  <WindowResizer>
    {width => (
      <div className={styles.container}>
        {width >= md && (
          <h1 className={styles.header}>{title}</h1>
        )}
        <div className={styles.listWrapperColumn}>
          {items.map(({ id, name, to }) => (
            <Button
              key={id}
              element="link"
              title={name}
              big
              withIcon
              icon={selectedId === id ? BlueChevronIconSrc : ChevronIconSrc}
              invertIcon
              customStyle={cx(
                styles.listItemColumn,
                { [styles.listItemColumnSelected]: selectedId === id },
              )}
              customTextStyle={styles.listItemColumnText}
              transparent
              to={to}
            />
          ))}
        </div>
        <div className={styles.listWrapperRow}>
          {items.map(({ id, name, to }) => (
            <Tab
              key={id}
              title={name}
              to={to}
              selected={selectedId === id}
            />
          ))}
        </div>
      </div>

    )}
  </WindowResizer>
);

ListMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default withRouter(ListMenu);
