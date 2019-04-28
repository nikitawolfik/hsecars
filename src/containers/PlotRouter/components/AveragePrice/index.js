/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Field, Form } from 'react-final-form';

import { DocumentTitle, WindowResizer } from 'components';
import {
  datasetnew,
  paramsSelectObj as newparams,
} from 'assets/constants';
import { md } from 'utils/breakpoints';

import styles from './styles.module.scss';

const paramsSelectObj = {
  ...newparams,
  segment: {
    placeholder: 'Класс',
  },
  Power: {
    placeholder: 'Мощность',
  },
  Age: {
    placeholder: 'Возраст',
  },
};
delete paramsSelectObj.Model;
delete paramsSelectObj.Gas;

const Plots = () => {
  const [type, setType] = useState(['Make']);
  const handleForm = (values) => {
    const { type: mode } = values;
    setType([mode]);
  };

  const options = Object.keys(paramsSelectObj).map(param => (
    <option
      key={param}
      value={param}
    >
      {paramsSelectObj[param].placeholder}
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
        pv[cv[param]] = {
          price: parseInt(cv.Price, 10),
          count: 1,
        };
      } else {
        pv[cv[param]].price += parseInt(cv.Price, 10);
        pv[cv[param]].count += 1;
      }
      return pv;
    }, {});
    const keys = Object.keys(temp);
    if (param === 'Volume' || param === 'Drive' || param === 'Transmission' || param === 'Age' || param === 'Power') {
      keys.sort((a, b) => parseFloat(a) - parseFloat(b));
    }
    const data = keys.reduce((pv, cv) => {
      pv.x.push(cv);
      pv.y.push(parseInt(temp[cv].price / temp[cv].count, 10));
      return pv;
    }, {
      y: [],
      x: [],
      type: 'scatter',
      mode: 'lines+markers',
    });

    if (param === 'Drive') {
      data.x = ['Передний/Задний', 'Полный'];
    }

    if (param === 'Transmission') {
      data.x = ['Механика', 'Автомат'];
    }

    return (
      <div className={styles.plotContainer} key={type}>
        <Plot
          data={[data]}
          config={{
            displayModeBar: false,
          }}
          layout={{
            width: width > md ? width - 240 : width,
            height: width > md ? window.innerHeight - 200 : '100%',
            title: paramsSelectObj[param].placeholder,
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
              type: 'Make',
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
