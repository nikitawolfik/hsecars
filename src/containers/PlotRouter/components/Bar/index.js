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
  Make: {
    title: 'марок',
    option: 'Марка',
  },
  Color: {
    title: 'цветов',
    option: 'Цвет',
  },
  Body: {
    title: 'типов кузова',
    option: 'Кузов',
  },
  segment: {
    title: 'классов',
    option: 'Класс',
  },
};

const Plots = () => {
  const [type, setType] = useState(['Make']);
  const handleForm = (values) => {
    const { type: mode } = values;
    setType([mode]);
  };

  const options = ['Make', 'Color', 'Body', 'segment'].map(param => (
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
    .filter(car => car.Age <= 25)
    .filter(car => car.segment != null);

  const plots = width => type.map((param) => {
    const temp = dataset.reduce((pv, cv) => {
      if (!(cv[param] in pv)) {
        pv[cv[param]] = 1;
      } else {
        pv[cv[param]] += 1;
      }
      return pv;
    }, {});
    const temp2 = Object.keys(temp).reduce((pv, cv) => {
      const obj = {
        name: cv,
        value: temp[cv],
      };
      pv.push(obj);
      return pv;
    }, []).sort((b, a) => a.value - b.value);

    const data = {
      y: temp2.map(car => parseInt(car.value, 10)),
      x: temp2.map(car => car.name),
      type: 'bar',
      marker: {
        color: temp2.map(() => 'rgba(45,95,230, 0.5)'),
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
            width: width > md ? width - 240: width,
            height: width > md ? window.innerHeight - 200 : '100%',
            title: `Распределение ${PARAMS_TRANSLATE[param].title}`,
            font: {
              family: 'Inter',
              letterSpacing: '0.5px',
              size: 20,
            },
            margin: {
              b: 150,
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
            Bar Charts
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
