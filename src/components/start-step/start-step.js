import React, {Component} from 'react';
import {Formik} from 'formik';
import Field from '../field/field';
import Form from '../form/form';
import Button from '../button/button';
import PersonalInfoSchema from '../../schema/personal-info-scema';

class StartStep extends Component {
  render() {
    const {hasPrevious, personalInfo, onSubmit} = this.props;
    const initialValues = personalInfo || {firstName: '', email: ''};
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={PersonalInfoSchema}
      >
        <Form>
          <h2>1. Введите имя и e-mail</h2>
          <Form.Row>
            <Field name="firstName" placeholder="Имя" />
          </Form.Row>
          <Form.Row>
            <Field name="email" type="email" placeholder="E-mail" />
          </Form.Row>

          <Button variant="accent" disabled={!hasPrevious}>
            Назад
          </Button>

          <Button variant="accent" type="submit">
            Далее
          </Button>
        </Form>
      </Formik>
    );
  }
}

export default StartStep;
