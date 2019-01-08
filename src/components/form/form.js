import React, {Component} from 'react';
import {Form as FormikForm} from 'formik';
import FormRow from './form-row';

import './form.scss';

class Form extends Component {
  static Row = FormRow;

  render() {
    return <FormikForm {...this.props} />;
  }
}

export default Form;
