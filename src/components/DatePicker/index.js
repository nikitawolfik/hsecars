import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import * as moment from 'moment';

import calendarIconSrc from 'assets/svg/calendar.svg';
import closeIconSrc from 'assets/svg/close.svg';
import forwardIconSrc from 'assets/svg/forward.svg';
import backIconSrc from 'assets/svg/back.svg';
import { md } from 'utils/breakpoints';

import styles from './styles.module.scss';
import './datepicker_override.css';

const divB = 'DayPickerNavigation_button DayPickerNavigation_button_1 DayPickerNavigation_button__default DayPickerNavigation_button__default_2 DayPickerNavigation_button__horizontal DayPickerNavigation_button__horizontal_3 DayPickerNavigation_button__horizontalDefault DayPickerNavigation_button__horizontalDefault_4 DayPickerNavigation_leftButton__horizontalDefault DayPickerNavigation_leftButton__horizontalDefault_5';
const imgB = 'DayPickerNavigation_svg__horizontal DayPickerNavigation_svg__horizontal_1';
const divF = 'DayPickerNavigation_button DayPickerNavigation_button_1 DayPickerNavigation_button__default DayPickerNavigation_button__default_2 DayPickerNavigation_button__horizontal DayPickerNavigation_button__horizontal_3 DayPickerNavigation_button__horizontalDefault DayPickerNavigation_button__horizontalDefault_4 DayPickerNavigation_rightButton__horizontalDefault DayPickerNavigation_rightButton__horizontalDefault_5';
const imgF = 'DayPickerNavigation_svg__horizontal DayPickerNavigation_svg__horizontal_1';

const ButtonIcon = ({ startDate, endDate, setDates, onFocusChange, mode }) => {
  let src;
  if (mode === 'start') {
    src = startDate ? closeIconSrc : calendarIconSrc;
  } else {
    src = endDate ? closeIconSrc : calendarIconSrc;
  }
  return (
    <button
      type="button"
      className={cx(
        styles.selectButton,
        {
          [styles.startButton]: mode === 'start',
          [styles.endButton]: mode === 'end',
          [styles.selectButtonResetStart]: mode === 'start' && startDate,
          [styles.selectButtonResetEnd]: mode === 'end' && endDate,
        },
      )}
      onClick={() => {
        if (mode === 'start') {
          setDates(null, endDate);
          onFocusChange('startDate');
        } else {
          setDates(startDate, null);
          onFocusChange('endDate');
        }
      }}
    >
      <img
        className={cx(
          styles.selectImg,
          {
            [styles.startImg]: mode === 'start',
            [styles.endImg]: mode === 'end',
          },
        )}
        src={src}
      />
    </button>
  );
};

ButtonIcon.propTypes = {
  startDate: PropTypes.shape({}),
  endDate: PropTypes.shape({}),
  setDates: PropTypes.func,
  onFocusChange: PropTypes.func,
  mode: PropTypes.string,
};

const DatePicker = ({ startDate, endDate, onChange, setDates }) => {
  const [focusedInput, onFocusChange] = useState(null);
  const width = window.innerWidth;
  return (
    <div
      className={cx({
        wrapperStart: startDate,
        wrapperEnd: endDate,
      })}
    >
      <div>
        <ButtonIcon
          startDate={startDate}
          endDate={endDate}
          setDates={setDates}
          onFocusChange={onFocusChange}
          mode="start"
        />
        <DateRangePicker
          readOnly
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={onChange}
          focusedInput={focusedInput}
          onFocusChange={field => onFocusChange(field)}
          startDatePlaceholderText="От"
          endDatePlaceholderText="Сегодня"
          noBorder
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          initialVisibleMonth={width > md ? () => moment().subtract(1, 'month') : () => moment()}
          customArrowIcon={<img src={forwardIconSrc} />}
          numberOfMonths={width > 900 ? 2 : 1} // 900+px -> 2 months
          hideKeyboardShortcutsPanel
          navPrev={(
            <div className={divB}>
              <img src={backIconSrc} className={imgB} />
            </div>
          )}
          navNext={(
            <div className={divF}>
              <img src={forwardIconSrc} className={imgF} />
            </div>
          )}
        />
        <ButtonIcon
          startDate={startDate}
          endDate={endDate}
          setDates={setDates}
          onFocusChange={onFocusChange}
          mode="end"
        />
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  setDates: PropTypes.func,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
};

export default DatePicker;
