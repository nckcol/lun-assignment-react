import React, {Component} from 'react';
import cn from 'classnames';
import './Input.scss';

class Input extends Component {
  render() {
    const {error} = this.props;
    return (
      <input
        className={cn('Input', {
          'Input-error': error
        })}
      />
    );
  }
}

export default Input;
