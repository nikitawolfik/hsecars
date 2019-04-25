import React from 'react';
import PropTypes from 'prop-types';

import ErrorImgSrc from 'assets/svg/network-error.svg';
import { Button } from 'components';
import styles from './styles.module.scss';


const NetworkError = () => (
  <div className={styles.container}>
    <img src={ErrorImgSrc} />
    <h1 className={styles.errorText}>Ошибка подключения</h1>
    <Button
      type="button"
      className={styles.errorButton}
      element="button"
      title="Перезагрузить страницу"
      withTitle
      customStyle={styles.errorButton}
      customTextStyle={styles.errorButtonText}
      onClick={() => window.location.reload()}
      medium
    />
  </div>
);

NetworkError.propTypes = {
  match: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

export default NetworkError;
