export default (values) => {
  const errors = {};

  const selects = ['Make', 'Body', 'Color', 'Drive', 'Owners', 'Transmission', 'Gas', 'Volume'];
  const inputs = ['Power', 'Mileage', 'Age'];
  const options = ['Марка', 'Привод', 'Трансмиссия', 'Количество владельцев', 'Цвет', 'Тип кузова', 'Тип топлива', 'Объем двигателя'];

  inputs.forEach((input) => {
    if (!values[input]) {
      errors[input] = 'Required';
    } else if (Number.isNaN(parseInt(values[input], 10))) {
      errors[input] = 'Enter a number';
    }
  });

  selects.forEach((select) => {
    if (options.some(el => values[select].includes(el))) {
      errors[select] = 'Required';
    }
  });

  if (values.Age > 20) {
    errors.Age = 'Hi, Grampa';
  }

  if (values.Power > 400) {
    errors.Power = 'Oh, boi';
  }

  if (values.Mileage > 140000) {
    errors.Mileage = 'Car shouldn\'t live that long';
  }

  if (values.Volume > 6) {
    errors.Volume = 'How much does it consume?!';
  }

  return errors;
};
