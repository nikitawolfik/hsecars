import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-focus';


import {
  coefficients,
  dataset,
  params,
  makeValues,
  bodies,
  colors,
  drive,
  gas,
  volumes,
  makesmodels,
  carToClass,
  paramsSelectObj,
  paramsIntObj,
} from 'assets/constants';

import {
  body,
  bodyInverted,
  color,
  colorInverted,
  gas as tgas,
  gasInverted,
  drives,
  drivesInverted,
} from 'assets/constants/translate';

import { Button, WindowResizer } from 'components';
import { md } from 'utils/breakpoints';
import parseSearch from 'utils/parseSearch';
import makeQuery from 'utils/makeQuery';
import validate from './validate';

import styles from './styles.module.scss';

const focusOnError = createDecorator();

const paramsValues = params.reduce((pv, cv) => {
  const test = dataset.reduce((pv1, cv1) => {
    if (!pv1) {
      pv1.push(cv1[cv]);
    }
    if (!pv1.includes(cv1[cv])) {
      pv1.push(cv1[cv]);
    }
    return pv1;
  }, []);
  pv[cv] = test;
  return pv;
}, {});

const onSubmit = (setPrice, push) => (values) => {
  const carClass = carToClass[`${values.Make} ${values.Model}`];

  const { Intercept } = coefficients;
  const Age = values.Age * coefficients.Age;
  const Body = coefficients.Body[bodies[values.Body]];
  const Color = coefficients.Color[colors[values.Color]];
  const Drive = coefficients.Drive[drive[values.Drive]];
  const Gas = coefficients.Gas[gas[values.Gas]];
  const Make = coefficients.Make[makeValues[values.Make]];
  const Mileage = values.Mileage * coefficients.Mileage;
  const Owners = coefficients.Owners[values.Owners];
  const Power = values.Power * coefficients.Power;
  const Transmission = coefficients.Transmisson[values.Transmission === 'Автомат' ? 1 : 0];
  const Volume = coefficients.Volume[values.Volume.slice(0, 1)];
  const Class = coefficients.Class[carClass];
  const price = (Intercept + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume + Class);

  if (price > 0) {
    setPrice(price.toLocaleString('ru'));
  } else {
    setPrice('error');
  }

  const valuesQuery = {
    ...values,
    Body: body[values.Body],
    Gas: tgas[values.Gas],
    Color: color[values.Color],
    Drive: drives[values.Drive],
  };

  push(makeQuery(valuesQuery));
};

const generateFields = values => (name) => {
  if (name in paramsSelectObj) {
    let optionsArray = [];

    if (name === 'Make') {
      optionsArray = paramsValues[name].filter(el => el !== 'Другая');
    } else if (name === 'Model') {
      optionsArray = !Object.keys(makeValues).includes(values.Make)
        ? []
        : makesmodels[values.Make];
    } else if (name === 'Drive') {
      optionsArray = ['Полный', 'Передний', 'Задний'];
    } else if (name === 'Owners') {
      optionsArray = ['1', '2', '3', '4'];
    } else if (name === 'Transmission') {
      optionsArray = ['Автомат', 'Механика'];
    } else if (name === 'Volume') {
      optionsArray = [...volumes];
    } else if (name === 'Gas') {
      optionsArray = ['Бензин', 'Другое'];
    } else {
      optionsArray = paramsValues[name];
    }

    const options = optionsArray.sort().map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));

    return (
      <div className={styles.fieldWrapper} key={name}>
        <Field
          name={name}
        >
          {({ input, meta }) => (
            <div className={styles.inputInside}>
              <div className={styles.inputMeasure}>
                <select
                  {...input}
                  type="select"
                  placeholder={name}
                  className={cx(
                    styles.select,
                    {
                      [styles.withError]: meta.touched && meta.error,
                    },
                  )}
                >
                  <option>{paramsSelectObj[name].placeholder}</option>
                  {options}
                </select>
              </div>
              <span className={styles.error}>{meta.error && meta.touched && meta.error}</span>
            </div>
          )}
        </Field>
      </div>
    );
  }

  return (
    <div className={styles.fieldWrapper} key={name}>
      <Field
        name={name}
      >
        {({ input, meta }) => (
          <div className={styles.inputInside}>
            <div className={styles.inputMeasure}>
              <input
                {...input}
                autoComplete="off"
                type="number"
                pattern="\d*"
                placeholder={paramsIntObj[name].placeholder}
                className={cx(styles.input,
                  {
                    [styles.withError]: meta.touched && meta.error,
                  })}
              />
              <span className={styles.measure}>{paramsIntObj[name].measure}</span>
            </div>
            <span className={styles.error}>{meta.error && meta.touched && meta.error}</span>
          </div>
        )}
      </Field>
    </div>
  );
};


const Regression = ({ location: { search }, history: { push }}) => {
  const [price, setPrice] = useState(null);
  const [fields, setFields] = useState(null);
  //  let submit;

  useEffect(() => {
    const query = parseSearch(search);
    if (query) {
      const valuesQuery = {
        ...query,
        Make: query.Make.replace('%20', ' '),
        Body: bodyInverted[query.Body],
        Gas: gasInverted[query.Gas],
        Color: colorInverted[query.Color],
        Drive: drivesInverted[query.Drive],
      };
      setFields(valuesQuery);
    }
  }, []);

  let initialValues = {
    Make: 'Марка',
    //  Age: 7,
    Body: 'Тип кузова',
    Color: 'Цвет',
    Drive: 'Привод',
    //  Mileage: 35000,
    Owners: 'Количество владельцев',
    //  Power: 123,
    Transmission: 'Трансмиссия',
    Gas: 'Тип топлива',
    Volume: 'Объем двигателя',
  };

  //  const baseValues = { ...initialValues };

  //  if (false) {
  //   initialValues = {
  //      Make: 'BMW',
  //      Age: 7,
  //      Body: 'седан',
  //      Color: 'белый',
  //      Drive: 'Передний',
  //      Mileage: 35000,
  //      Owners: '1',
  //      Power: 123,
  //      Transmission: '1',
  //      Gas: 'Бензин',
  //      Volume: '1.1',
  //    };
  //  }

  if (fields) {
    initialValues = { ...fields };
  }

  return (
    <WindowResizer>
      {width => (
        <div className={styles.container}>

          <div className={styles.formWrapper}>
            <Form
              decorators={[focusOnError]}
              validate={validate}
              onSubmit={onSubmit(setPrice, push)}
              initialValues={initialValues}
              render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
                  <div className={styles.row}>
                    {params.slice(0, 4).map(generateFields(values))}
                  </div>
                  <div className={styles.row}>
                    {params.slice(4, 8).map(generateFields(values))}
                  </div>
                  <div className={styles.rowShort}>
                    {params.slice(8, 12).map(generateFields(values))}
                  </div>
                  <div className={styles.buttonWrapper}>
                    <Button
                      title="Submit"
                      customStyle={styles.button}
                      customTextStyle={styles.buttonText}
                      type="submit"
                      disabled={submitting}
                      onClick={handleSubmit}
                    />
                    {width < md && (
                      <div className={styles.buttonSeparator} />
                    )}
                    <Button
                      title="Reset"
                      customStyle={styles.buttonReset}
                      customTextStyle={styles.buttonText}
                      type="button"
                      disabled={pristine}
                      onClick={reset}
                    />
                  </div>
                </form>
              )
              }
            />
          </div>

          <div className={styles.price}>
            {!price && (
              <h2 className={styles.priceText}>
                Выберите параметры автомобиля, чтобы рассчитать стоимость
              </h2>
            )}

            {price && price !== 'error' && (
              <h2 className={styles.priceText}>
                Примерная стоимость: <strong>{price} рублей.</strong>
              </h2>
            )}

            {price && price === 'error' && (
              <h2 className={styles.priceText}>
                Ошибка при расчете стоимости.
              </h2>
            )}
          </div>

        </div>

      )}
    </WindowResizer>
  );
};

Regression.propTypes = {
  location: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

export default Regression;
