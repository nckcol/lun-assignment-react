import React, {Component} from 'react';
import Input from '../input/input';

import './field.scss';

class Field extends Component {
  render() {
    const {...inputProps} = this.props;
    return (
      <label className="Field">
        <Input {...inputProps} />
        {inputProps.error && (
          <span className="Field-errorMessage">&mdash; {inputProps.error}</span>
        )}
      </label>
    );
  }
}

export default Field;
