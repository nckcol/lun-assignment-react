import React, {Component} from 'react';
import {Formik} from 'formik';
import Form from '../form/form';
import Button from '../button/button';
import ConfirmationSchema from '../../schema/confirmation-schema';
import Step from '../step/step';
import ImageSwitchField from '../image-switch-field/image-switch-field';
import './confirmation-step.scss';

class ConfirmationStep extends Component {
  render() {
    const {
      hasPrevious,
      confirmation,
      animalOptions,
      onSubmit,
      onBack
    } = this.props;
    const initialValues = confirmation || {
      animal: null
    };

    return (
      <Step title="4. Выберите любимого котика">
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validationSchema={ConfirmationSchema}
          onSubmit={onSubmit}
        >
          {({values, errors, touched, setFieldValue}) => (
            <Form className="ConfirmationStep">
              <Step.Content>
                <Form.Row>
                  <ImageSwitchField name="animal" options={animalOptions} />
                </Form.Row>
              </Step.Content>

              <Step.Actions>
                <Button
                  variant="accent"
                  type="button"
                  disabled={!hasPrevious}
                  onClick={onBack}
                >
                  Назад
                </Button>

                <Button variant="primary" type="submit">
                  Завершить
                </Button>
              </Step.Actions>
            </Form>
          )}
        </Formik>
      </Step>
    );
  }
}

export default ConfirmationStep;
