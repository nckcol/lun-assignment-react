import React, {Component} from 'react';
import {Field as FormikField} from 'formik';
import FieldError from '../field-error/field-error';
import ImageSwitch from '../image-switch/image-switch';
import './image-switch-field.scss';

class ImageSwitchField extends Component {
  render() {
    const {name, options} = this.props;
    return (
      <FormikField
        name={name}
        render={({form}) => {
          const showError = form.touched[name] && form.errors[name];

          return (
            <div className="ImageSwitchField">
              <div className="ImageSwitchField-input">
                <ImageSwitch
                  options={options}
                  value={form.values[name]}
                  onChange={(option) => form.setFieldValue(name, option)}
                />
                {showError && (
                  <div className="ImageSwitchField-error">
                    <FieldError
                      message={form.errors[name].type || form.errors[name]}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default ImageSwitchField;
