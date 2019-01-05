import React, {Component} from 'react';
import Field from '../field/field';
import Form from '../form/form';

class StartStep extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Field placeholder="Имя" />
        </Form.Row>
        <Form.Row>
          <Field placeholder="E-mail" error="в адресе должен быть символ «@»" />
        </Form.Row>
      </Form>
    );
  }
}

export default StartStep;
