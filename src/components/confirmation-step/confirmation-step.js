import React, {Component} from 'react';
import {Formik} from 'formik';
import Form from '../form/form';
import Button from '../button/button';
import SocialInput from '../social-input/social-input';
import FieldError from '../field-error/field-error';
import ConfirmationSchema from '../../schema/confirmation-schema';
import ImageSwitch from '../image-switch/image-switch';

class ConfirmationStep extends Component {
  render() {
    const {hasPrevious, confirmation, animalOptions, onSubmit} = this.props;
    const initialValues = confirmation || {
      animal: null
    };

    console.log(confirmation);

    return (
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={ConfirmationSchema}
        onSubmit={onSubmit}
      >
        {({values, errors, touched, setFieldValue}) => (
          <Form>
            <h2>4. Выберите любимого котика</h2>

            <Form.Row>
              <ImageSwitch
                options={animalOptions}
                value={values.animal}
                onChange={(option) => setFieldValue('animal', option)}
              />
              {touched.animal && errors.animal && (
                <FieldError message={errors.animal.type} />
              )}
            </Form.Row>

            <Button variant="accent" type="button" disabled={!hasPrevious}>
              Назад
            </Button>

            <Button variant="primary" type="submit">
              Завершить
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ConfirmationStep;
