/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Field, Form } from 'react-final-form';

import { DocumentTitle, WindowResizer } from 'components';
import {
  datasetnew,
} from 'assets/constants';
import { md } from 'utils/breakpoints';

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

  const plots = width => type.map((param) => {
    const data = {
      x: dataset.map(car => parseInt(car[param], 10)),
      type: 'histogram',
      marker: {
        color: dataset.map(() => 'rgba(45,95,230, 0.5)'),
      },
    };

    return (
      <div className={styles.plotContainer}>
        <Plot
          data={[data]}
          config={{
            displayModeBar: false,
          }}
          layout={{
            width: width > md ? width - 240 : width,
            height: width > md ? window.innerHeight - 200 : '100%',
            title: `Распределение ${PARAMS_TRANSLATE[param].title}`,
            font: {
              family: 'Inter',
              letterSpacing: '0.5px',
              size: width > md ? 20 : width > 400 ? 16 : 10,
            },
          }}
        />
      </div>
    );
  });

  return (
    <WindowResizer>
      {width => (
        <div className={styles.container}>
          <DocumentTitle>
            Histograms
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
            {plots(width)}
          </div>
        </div>
      )}
    </WindowResizer>
  );
};


export default Plots;
