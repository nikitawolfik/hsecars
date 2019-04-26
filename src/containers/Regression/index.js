import React, { useState, useEffect } from 'react';
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
  const Transmission = coefficients.Transmisson[values.Transmission];
  const Volume = coefficients.Volume[values.Volume.slice(0, 1)];
  const price = (Intercept + Age + Body + Color + Drive + Gas + Make + Mileage + Owners + Power + Transmission + Volume);

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

const generateFields = (name) => {
  if (name === 'Make') {
    const options = paramsValues[name].sort().map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Марка</option>
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

  if (name === 'Age') {
    return (
      <div className={styles.fieldWrapper}>
        <Field
          name={name}
        >
          {({ input, meta }) => (
            <div className={styles.inputInside}>
              <div className={styles.inputMeasure}>
                <input
                  {...input}
                  type="number"
                  pattern="\d*"
                  placeholder={name}
                  className={cx(styles.input,
                    {
                      [styles.withError]: meta.touched && meta.error,
                    })}
                />
                <span className={styles.measure}>лет</span>
              </div>
              <span className={styles.error}>{meta.error && meta.touched && meta.error}</span>
            </div>
          )}
        </Field>
      </div>
    );
  }

  if (name === 'Body') {
    const options = paramsValues[name].sort().map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Тип кузова</option>
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

  if (name === 'Color') {
    const options = paramsValues[name].sort().map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Цвет</option>
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

  if (name === 'Drive') {
    const options = ['Полный', 'Передний', 'Задний'].map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Привод</option>
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

  if (name === 'Mileage') {
    return (
      <div className={styles.fieldWrapper}>
        <Field
          name={name}
        >
          {({ input, meta }) => (
            <div className={styles.inputInside}>
              <div className={styles.inputMeasure}>
                <input
                  {...input}
                  type="number"
                  pattern="\d*"
                  placeholder={name}
                  className={cx(styles.input,
                    {
                      [styles.withError]: meta.touched && meta.error,
                    })}
                />
                <span className={styles.measure}>км</span>
              </div>
              <span className={styles.error}>{meta.error && meta.touched && meta.error}</span>
            </div>
          )}
        </Field>
      </div>
    );
  }

  if (name === 'Owners') {
    const options = ['1', '2', '3', '4'].map(optionParam => (
      <option
        key={optionParam}
        value={optionParam}
      >
        {optionParam === '4' ? '4+' : optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Количество владельцев</option>
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

  if (name === 'Power') {
    return (
      <div className={styles.fieldWrapper}>
        <Field
          name={name}
        >
          {({ input, meta }) => (
            <div className={styles.inputInside}>
              <div className={styles.inputMeasure}>
                <input
                  {...input}
                  type="number"
                  pattern="\d*"
                  placeholder={name}
                  className={cx(styles.input,
                    {
                      [styles.withError]: meta.touched && meta.error,
                    })}
                />
                <span className={styles.measure}>л.с.</span>
              </div>
              <span className={styles.error}>{meta.error && meta.touched && meta.error}</span>
            </div>
          )}
        </Field>
      </div>
    );
  }

  if (name === 'Transmission') {
    const options = ['Автомат', 'Механика'].map(optionParam => (
      <option
        key={optionParam}
        value={optionParam === 'Автомат' ? 1 : 0}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Трансмиссия</option>
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

  if (name === 'Volume') {
    const options = volumes.map(optionParam => (
      <option
        key={optionParam}
        value={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Объем двигателя</option>
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

  if (name === 'Gas') {
    const options = ['Бензин', 'Другое'].map(optionParam => (
      <option
        key={optionParam}
      >
        {optionParam}
      </option>
    ));
    return (
      <div className={styles.fieldWrapper}>
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
                  <option>Тип топлива</option>
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
  return null;
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
    //Age: 7,
    Body: 'Тип кузова',
    Color: 'Цвет',
    Drive: 'Привод',
    //Mileage: 35000,
    Owners: 'Количество владельцев',
    //Power: 123,
    Transmission: 'Трансмиссия',
    Gas: 'Тип топлива',
    Volume: 'Объем двигателя',
  };

  if (false) {
   initialValues = {
      Make: 'BMW',
      Age: 7,
      Body: 'седан',
      Color: 'белый',
      Drive: 'Передний',
      Mileage: 35000,
      Owners: '1',
      Power: 123,
      Transmission: '1',
      Gas: 'Бензин',
      Volume: '1.1',
    };
  }

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
              render={({ handleSubmit, reset, submitting, pristine }) => {
                //  submit = handleSubmit;
                return (
                  <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                  >
                    <div className={styles.row}>
                      {params.slice(0, 5).map(generateFields)}
                    </div>
                    <div className={styles.row}>
                      {params.slice(5, 9).map(generateFields)}
                    </div>
                    <div className={styles.rowShort}>
                      {params.slice(9, 12).map(generateFields)}
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
                );
              }}
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

export default Regression;
