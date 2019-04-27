import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-focus';


import {
  coefficients,
  coefficientsB,
  coefficientsC,
  coefficientsSuv,
  coefficientsCross,
  datasetnew,
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
  const test = datasetnew.reduce((pv1, cv1) => {
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
  let Age = values.Age * coefficients.Age;
  let Body = coefficients.Body[bodies[values.Body]];
  let Color = coefficients.Color[colors[values.Color]];
  let Drive = coefficients.Drive[drive[values.Drive]];
  let Gas = coefficients.Gas[gas[values.Gas]];
  let Make = coefficients.Make[makeValues[values.Make]];
  let Mileage = values.Mileage * coefficients.Mileage;
  let Owners = coefficients.Owners[values.Owners];
  let Power = values.Power * coefficients.Power;
  let Transmission = coefficients.Transmisson[values.Transmission === 'Автомат' ? 1 : 0];
  let Volume = coefficients.Volume[values.Volume.slice(0, 1)];
  const Class = coefficients.Class[carClass];
  let price = (Intercept + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume + Class);

  if (carClass === 'b') {
    const { Intercept: InterceptB } = coefficientsB;
    Age = values.Age * coefficientsB.Age;
    Body = coefficientsB.Body[bodies[values.Body]];
    Color = coefficientsB.Color[colors[values.Color]];
    Drive = coefficientsB.Drive[drive[values.Drive]];
    Gas = coefficientsB.Gas[gas[values.Gas]];
    Make = coefficientsB.Make[makeValues[values.Make]];
    Mileage = values.Mileage * coefficientsB.Mileage;
    Owners = coefficientsB.Owners[values.Owners];
    Power = values.Power * coefficientsB.Power;
    Transmission = coefficientsB.Transmisson[values.Transmission];
    Volume = coefficientsB.Volume[values.Volume.slice(0, 1)];
    price = (InterceptB + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume);
  }

  if (carClass === 'c') {
    const { Intercept: InterceptC } = coefficientsC;
    Age = values.Age * coefficientsC.Age;
    Body = coefficientsC.Body[bodies[values.Body]];
    Color = coefficientsC.Color[colors[values.Color]];
    Drive = coefficientsC.Drive[drive[values.Drive]];
    Gas = coefficientsC.Gas[gas[values.Gas]];
    Make = coefficientsC.Make[makeValues[values.Make]];
    Mileage = values.Mileage * coefficientsC.Mileage;
    Owners = coefficientsC.Owners[values.Owners];
    Power = values.Power * coefficientsC.Power;
    Transmission = coefficientsC.Transmisson[values.Transmission];
    Volume = coefficientsC.Volume[values.Volume.slice(0, 1)];
    price = (InterceptC + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume);
  }

  if (carClass === 'suv') {
    const { Intercept: InterceptSuv } = coefficientsSuv;
    Age = values.Age * coefficientsSuv.Age;
    Body = coefficientsSuv.Body[bodies[values.Body]];
    Color = coefficientsSuv.Color[colors[values.Color]];
    Drive = coefficientsSuv.Drive[drive[values.Drive]];
    Gas = coefficientsSuv.Gas[gas[values.Gas]];
    Make = coefficientsSuv.Make[makeValues[values.Make]];
    Mileage = values.Mileage * coefficientsSuv.Mileage;
    Owners = coefficientsSuv.Owners[values.Owners];
    Power = values.Power * coefficientsSuv.Power;
    Transmission = coefficientsSuv.Transmisson[values.Transmission];
    Volume = coefficientsSuv.Volume[values.Volume.slice(0, 1)];
    price = (InterceptSuv + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume);
  }

  if (carClass === 'cross') {
    const { Intercept: InterceptCross } = coefficientsCross;
    Age = values.Age * coefficientsCross.Age;
    Body = coefficientsCross.Body[bodies[values.Body]];
    Color = coefficientsCross.Color[colors[values.Color]];
    Drive = coefficientsCross.Drive[drive[values.Drive]];
    Gas = coefficientsCross.Gas[gas[values.Gas]];
    Make = coefficientsCross.Make[makeValues[values.Make]];
    Mileage = values.Mileage * coefficientsCross.Mileage;
    Owners = coefficientsCross.Owners[values.Owners];
    Power = values.Power * coefficientsCross.Power;
    Transmission = coefficientsCross.Transmisson[values.Transmission];
    Volume = coefficientsCross.Volume[values.Volume.slice(0, 1)];
    price = (InterceptCross + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume);
  }

  if (price > 0) {
    const strPrice = price.toLocaleString('ru');
    setPrice(strPrice.slice(0, strPrice.length - 4));
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

    const segment = carToClass[`${values.Make} ${values.Model}`] || null;

    if (segment === 'b' || segment === 'c' || segment === 'suv' || segment === 'cross') {
      if (name === 'Volume') {
        const optionsAll = datasetnew
          .filter(car => car.segment === segment)
          .map(car => car[name])
          .filter(param => param !== 'null')
          .sort();
        const [first, last] = [optionsAll[0], optionsAll[optionsAll.length - 1]];
        const [min, max] = [parseFloat(first), parseFloat(last)];
        optionsArray = [];
        for (let i = min; i < max; i += 0.1) {
          const num = parseFloat(i).toFixed(1);
          optionsArray.push(num);
        }
      }

      if (name === 'Body') {
        const optionsAll = datasetnew
          .filter(car => car.segment === segment)
          .map(car => car[name])
          .filter(param => param !== 'null')
          .sort();
        optionsArray = optionsAll.reduce((pv, cv) => {
          if (!pv.includes(cv)) {
            pv.push(cv);
          }
          return pv;
        }, []);
      }
    }

    let options = optionsArray.sort().map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));

    if (name === 'Transmission') {
      options = optionsArray.sort().map(optionParam => (
        <option
          value={optionParam === 'Автомат' ? 1 : 0}
          key={optionParam}
        >
          {optionParam}
        </option>
      ));
    }


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
                  disabled={name === 'Model' && values.Make === 'Марка'}
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


const Regression = ({ location: { search }, history: { push } }) => {
  const [price, setPrice] = useState(null);
  const [fields, setFields] = useState(null);
  //  let submit;

  useEffect(() => {
    const query = parseSearch(search);
    if (query) {
      const valuesQuery = {
        ...query,
        Make: query.Make.replace('%20', ' '),
        Model: query.Model.replace('%20', ' '),
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

  const baseValues = { ...initialValues };

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
              render={({ handleSubmit, reset, submitting, pristine, values }) => {
                let isFilled = 0;
                Object.keys(baseValues).forEach((field) => {
                  if (values[field] !== baseValues[field]) {
                    isFilled += 1;
                  }
                });
                return (
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
                        disabled={pristine && !isFilled}
                        onClick={reset}
                      />
                    </div>
                  </form>
                );
              }
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
