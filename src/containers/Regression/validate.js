import {
  makeValues,
  makesmodels,
  volumes,
} from 'assets/constants';

export default (possibleValues, paramsValues) => (values) => {
  const errors = {};

  const selects = ['Make', 'Body', 'Color', 'Drive', 'Owners', 'Transmission', 'Gas', 'Volume'];
  const changingSelects = ['Body', 'Volume'];
  const regularSelects = ['Make', 'Color', 'Drive', 'Owners', 'Transmission', 'Gas'];
  const inputs = ['Power', 'Mileage', 'Age'];
  const options = ['Марка', 'Привод', 'Трансмиссия', 'Количество владельцев', 'Цвет', 'Тип кузова', 'Тип топлива', 'Объем двигателя'];

  if (values.Make !== 'Марка' && !values.Model) {
    errors.Model = 'Required';
  }

  if (values.Age > 20) {
    errors.Age = 'Hi, Grampa';
  }

  if (values.Power > 400) {
    errors.Power = 'Oh, boi';
  }

  if (values.Power < 40) {
    errors.Power = 'Regular horse\'d be faster';
  }

  if (values.Mileage > 140000) {
    errors.Mileage = 'Car shouldn\'t live that long';
  }

  if (values.Volume > 6) {
    errors.Volume = 'How much does it consume?!';
  }

  inputs.forEach((input) => {
    if (!values[input]) {
      errors[input] = 'Required';
    } else if (Number.isNaN(parseInt(values[input], 10))) {
      errors[input] = 'Enter a number';
    } else if (values[input] < 0) {
      errors[input] = 'Be more positive';
    }
  });

  regularSelects.forEach((select) => {
    let optionsArray = [];

    if (select === 'Make') {
      optionsArray = paramsValues[select].filter(el => el !== 'Другая');
    } else if (select === 'Model') {
      optionsArray = !Object.keys(makeValues).includes(values.Make)
        ? []
        : makesmodels[values.Make];
    } else if (select === 'Drive') {
      optionsArray = ['Полный', 'Передний', 'Задний'];
    } else if (select === 'Owners') {
      optionsArray = ['1', '2', '3', '4'];
    } else if (select === 'Transmission') {
      optionsArray = ['1', '0'];
    } else if (select === 'Volume') {
      optionsArray = [...volumes];
    } else if (select === 'Gas') {
      optionsArray = ['Бензин', 'Другое'];
    } else {
      optionsArray = paramsValues[select];
    }

    if (!optionsArray.includes(values[select])) {
      errors[select] = 'Enter valid value';
    }
  });

  changingSelects.forEach((select) => {
    if (!possibleValues[select].includes(values[select])) {
      errors[select] = 'Choose wisely';
    }
  });

  selects.forEach((select) => {
    if (values[select]) {
      if (options.some(el => values[select].includes(el))) {
        errors[select] = 'Required';
      }
    }
  });

  return errors;
};
