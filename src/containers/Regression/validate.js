export default possibleValues => (values) => {
  const errors = {};

  const selects = ['Make', 'Body', 'Color', 'Drive', 'Owners', 'Transmission', 'Gas', 'Volume'];
  const changingSelects = ['Body', 'Volume'];
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
