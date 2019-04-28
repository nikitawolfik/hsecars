/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Field, Form } from 'react-final-form';

import { DocumentTitle } from 'components';
import {
  datasetnew,
} from 'assets/constants';

import styles from './styles.module.scss';

const PARAMS_TRANSLATE = {
  Power: {
    title: 'мощности',
    option: 'Мощность',
  },
  Age: {
    title: 'возраста',
    option: 'Возраст',
  },
  Mileage: {
    title: 'пробега',
    option: 'Пробег',
  },
  Volume: {
    title: 'объема двигателя',
    option: 'Объем двигателя',
  },
  Owners: {
    title: 'количества собственников',
    option: 'Количество собственников',
  },
};

const Plots = () => {
  const [type, setType] = useState(['Power']);
  const handleForm = (values) => {
    const { type: mode } = values;
    setType([mode]);
  };

  const options = ['Power', 'Age', 'Mileage', 'Volume', 'Owners'].map(param => (
    <option
      key={param}
      value={param}
    >
      {PARAMS_TRANSLATE[param].option}
    </option>
  ));

  const dataset = datasetnew
    .filter(car => car.Power <= 300)
    .filter(car => car.Mileage <= 400000)
    .filter(car => car.Age <= 25);

  const plots = type.map((param) => {
    const data = {
      x: dataset.map(car => parseInt(car[param], 10)),
      type: 'histogram',
    };

    return (
      <div className={styles.plotContainer}>
        <Plot
          data={[data]}
          config={{
            displayModeBar: false,
          }}
          layout={{
            width: '100%',
            title: `Распределение ${PARAMS_TRANSLATE[param].title}`,
            font: {
              family: 'Inter',
              letterSpacing: '0.5px',
              size: 20,
            },
          }}
        />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <DocumentTitle>
        Plots
      </DocumentTitle>

      <Form
        onSubmit={handleForm}
        initialValues={{
          type: 'Power',
        }}
        render={({ handleSubmit }) => (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onChange={handleSubmit}
          >
            <Field name="type">
              {({ input }) => (
                <select {...input} className={styles.select}>
                  {options}
                </select>
              )}
            </Field>
          </form>
        )
        }
      />

      <div className={styles.plots}>
        {plots}
      </div>
    </div>
  );
};


export default Plots;
