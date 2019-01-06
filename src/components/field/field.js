import React, {Component} from 'react';
import Input from '../input/input';
import {Field as FormikField} from 'formik';

import './field.scss';

class Field extends Component {
  render() {
    const {name, ...inputProps} = this.props;

    return (
      <FormikField
        name={name}
        render={({field, form: {touched, errors}}) => {
          const showError = touched[field.name] && errors[field.name];

          return (
            <label className="Field">
              <Input {...inputProps} {...field} error={showError} />
              {showError && (
                <span className="Field-errorMessage">
                  &mdash; {errors[field.name]}
                </span>
              )}
            </label>
          );
        }}
      />
    );
  }
}

export default Field;
