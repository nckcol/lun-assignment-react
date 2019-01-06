import React, {Component} from 'react';
import {oneOf} from 'prop-types';
import cn from 'classnames';
import './button.scss';

class Button extends Component {
  static propTypes = {
    variant: oneOf(['normal', 'accent', 'primary'])
  };
  static defaultProps = {
    variant: 'normal'
  };
  render() {
    const {children, variant, ...buttonProps} = this.props;
    return (
      <button
        className={cn('Button', `Button--variant-${variant}`)}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
