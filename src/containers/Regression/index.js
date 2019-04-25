import React, { useState } from 'react';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';

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
import { Button, FormError } from 'components';
import validate from './validate';

import styles from './styles.module.scss';

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

const onSubmit = setPrice => (values) => {
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

  setPrice(price.toLocaleString('ru'));
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
                  type="text"
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
                  type="text"
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
                  type="text"
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


const Regression = () => {
  const [price, setPrice] = useState(null);
  return (
    <div className={styles.container}>

      <div className={styles.formWrapper}>
        <Form
          validate={validate}
          onSubmit={onSubmit(setPrice)}
          initialValues={{
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
          }}
          render={({ handleSubmit, form, submitError }) => (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.errorWrapper}>
                {submitError && (
                  <FormError>{submitError}</FormError>
                )}
              </div>
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
                  onClick={handleSubmit}
                />
                <Button
                  title="Reset"
                  customStyle={styles.buttonReset}
                  customTextStyle={styles.buttonText}
                  type="button"
                  onClick={() => form.reset()}
                />
              </div>
            </form>
          )}
        />
      </div>

      <div className={styles.price}>
        {!price && (
          <h2>Выберите параметры автомобиля, чтобы рассчитать стоимость</h2>
        )}
        {price && (
          <h2>Примерная стоимость: <strong>{price} рублей.</strong></h2>
        )}
      </div>

    </div>
  );
};

export default Regression;
