import React from 'react';
import PropTypes from 'prop-types';

import classes from './Picker.css';

import Input from '../../Input/Input';
import Button from '../../Button/Button';

const picker = (props) => {
  return (
    <div className={classes.dateInput}>
      <div className={classes.inputForm}>
        <Input
          placeholder="YYYY"
          value={props.year.value}
          maxlength="4"
          isUpToStandard={props.year.isUpToStandard}
          alert={props.year.alert}
          type={this.state.year.type}
          onChange={this.yearChangeHandler()}
        />
        <Input
          placeholder="MM"
          value={props.month.value}
          maxlength="2"
          isUpToStandard={props.month.isUpToStandard}
          alert={props.month.alert}
          type={this.state.month.type}
          onChange={this.monthChangeHandler()}
        />
        <Input
          placeholder="DD"
          value={props.day.value}
          maxlength="2"
          isUpToStandard={props.day.isUpToStandard}
          alert={props.day.alert}
          type={this.state.day.type}
          onChange={this.dayChangeHandler()}
        />
      </div>
      <Button
        type="button"
        disabled={this.state.isSubmitDisabled}
      >
        <p>Submit</p>
      </Button>
      <div className={classes.useCurrentDate}>
        <Button
          onClick={this.useCurrentDate}
        >
          <p>Use Current Date</p>
        </Button>
      </div>
    </div>
  );
};

picker.propTypes = {
  year: PropTypes.shape({
    value: PropTypes.string,
    isUpToStandard: PropTypes.bool,
    alert: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  month: PropTypes.shape({
    value: PropTypes.string,
    isUpToStandard: PropTypes.bool,
    alert: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  day: PropTypes.shape({
    value: PropTypes.string,
    isUpToStandard: PropTypes.bool,
    alert: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default picker;

// class = a
