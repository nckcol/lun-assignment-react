import React, {Component} from 'react';
import './field-error.scss';

class FieldError extends Component {
  render() {
    const {message} = this.props;
    return <div className="FieldError">{message}</div>;
  }
}

export default FieldError;
