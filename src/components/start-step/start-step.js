import React, {Component} from 'react';
import {Formik} from 'formik';
import Field from '../field/field';
import Form from '../form/form';
import Button from '../button/button';
import PersonalInfoSchema from '../../schema/personal-info-scema';
import Step from '../step/step';
import './start-step.scss';

class StartStep extends Component {
  render() {
    const {hasPrevious, personalInfo, onSubmit} = this.props;
    const initialValues = personalInfo || {firstName: '', email: ''};
    return (
      <Step title="1. Введите имя и e-mail">
        <Formik
          initialValues={initialValues}
          validationSchema={PersonalInfoSchema}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          <Form className="StartStep">
            <Step.Content>
              <Form.Row>
                <Field name="firstName" placeholder="Имя" autoFocus />
              </Form.Row>
              <Form.Row>
                <Field name="email" type="email" placeholder="E-mail" />
              </Form.Row>
            </Step.Content>
            <Step.Actions>
              <Button variant="accent" type="button" disabled={!hasPrevious}>
                Назад
              </Button>

              <Button variant="accent" type="submit">
                Далее
              </Button>
            </Step.Actions>
          </Form>
        </Formik>
      </Step>
    );
  }
}

export default StartStep;
