import React, {Component} from 'react';
import './form-row.scss';

class FormRow extends Component {
  render() {
    return <div className="FormRow">{this.props.children}</div>;
  }
}

export default FormRow;
