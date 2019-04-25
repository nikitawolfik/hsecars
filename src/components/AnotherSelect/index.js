import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';

import ToggleIconSrc from 'assets/svg/chevron-down.svg';
import ResetIconSrc from 'assets/svg/close.svg';

import styles from './styles.module.scss';


const AnotherSelect = (props) => {
  const { options, manager, onSubmit } = props;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        manager: manager || 'all',
      }}
      render={({ handleSubmit, form, values }) => (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleSubmit}
        >
          <div className={styles.selectDiv}>
            <Field
              name="manager"
              component="select"
              value={manager}
              className={cx(
                styles.select,
                {
                  [styles.managerSelected]: !values.manager.includes('all'),
                },
              )}
            >
              <option className={styles.option} value="all">Все менеджеры</option>
              {options}
            </Field>
            <button
              onClick={() => {
                form.reset();
                onSubmit({ manager: 'all' });
              }}
              type="button"
              className={cx(
                styles.selectButton,
                {
                  [styles.selectButtonReset]: !values.manager.includes('all'),
                },
              )}
            >
              <img
                src={values.manager.includes('all') ? ToggleIconSrc : ResetIconSrc}
                className={cx({
                  [styles.selectImgReset]: !values.manager.includes('all'),
                  [styles.selectImg]: values.manager.includes('all'),
                })}
              />
            </button>
          </div>
        </form>
      )}
    />
  );
};


AnotherSelect.propTypes = {
  manager: PropTypes.string,
  options: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default AnotherSelect;
