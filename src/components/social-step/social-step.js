import React, {Component} from 'react';
import {Formik} from 'formik';
import Form from '../form/form';
import Button from '../button/button';
import SocialInput from '../social-input/social-input';
import FieldError from '../field-error/field-error';
import SocialSchema from '../../schema/social-schema';
import Step from '../step/step';

class SocialStep extends Component {
  render() {
    const {hasPrevious, social, onSubmit, onBack} = this.props;
    const initialValues = social || {
      facebook: null,
      vk: null,
      twitter: null,
      odnoklassniki: null
    };

    return (
      <Step title="3. Отметьте социальные сети">
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validationSchema={SocialSchema}
          onSubmit={onSubmit}
        >
          {({values, errors, touched, setFieldValue}) => (
            <Form>
              <Step.Content>
                <div style={{marginRight: '-80px'}}>
                  <Form.Row>
                    <SocialInput
                      name="facebook"
                      label="Facebook"
                      placeholder="Ваша страница в Facebook"
                      value={values.facebook}
                      onChange={(value) => setFieldValue('facebook', value)}
                    />
                    {touched.facebook && errors.facebook && (
                      <FieldError message={errors.facebook} />
                    )}
                  </Form.Row>

                  <Form.Row>
                    <SocialInput
                      name="vk"
                      label="Вконтакте"
                      placeholder="Ваша страница Вконтакте"
                      value={values.vk}
                      onChange={(value) => setFieldValue('vk', value)}
                    />
                    {touched.vk && errors.vk && (
                      <FieldError message={errors.vk} />
                    )}
                  </Form.Row>

                  <Form.Row>
                    <SocialInput
                      name="twitter"
                      label="Twitter"
                      placeholder="Ваша страница в Twitter"
                      value={values.twitter}
                      onChange={(value) => setFieldValue('twitter', value)}
                    />
                    {touched.twitter && errors.twitter && (
                      <FieldError message={errors.twitter} />
                    )}
                  </Form.Row>

                  <Form.Row>
                    <SocialInput
                      name="odnoklassniki"
                      label="Одноклассники"
                      placeholder="Ваша страница в Одноклассниках"
                      value={values.odnoklassniki}
                      onChange={(value) =>
                        setFieldValue('odnoklassniki', value)
                      }
                    />
                    {touched.odnoklassniki && errors.odnoklassniki && (
                      <FieldError message={errors.odnoklassniki} />
                    )}
                  </Form.Row>
                </div>
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

                <Button variant="accent" type="submit">
                  Далее
                </Button>
              </Step.Actions>
            </Form>
          )}
        </Formik>
      </Step>
    );
  }
}

export default SocialStep;
