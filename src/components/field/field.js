import React, {Component} from 'react';
import Input from '../input/input';
import {Field as FormikField} from 'formik';
import isFunction from '../../utils/is-function';

import './field.scss';

class Field extends Component {
  static defaultProps = {
    component: Input
  };

  render() {
    const {name, component: InputComponent, renderInput, ...rest} = this.props;

    return (
      <FormikField
        name={name}
        render={({field, form}) => {
          const showError = form.touched[field.name] && form.errors[field.name];
          const inputProps = {...rest, ...field, error: showError};

          return (
            <label className="Field">
              {isFunction(renderInput) ? (
                renderInput({inputProps, form})
              ) : (
                <InputComponent {...inputProps} form={form} />
              )}
              {showError && (
                <span className="Field-errorMessage">
                  &mdash; {form.errors[field.name]}
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
