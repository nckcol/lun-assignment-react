import React, {Component} from 'react';
import cn from 'classnames';
import './input.scss';

class Input extends Component {
  render() {
    const {error, ...inputProps} = this.props;
    return (
      <input
        className={cn('Input', {
          'Input--error': error
        })}
        type="text"
        {...inputProps}
      />
    );
  }
}

export default Input;
