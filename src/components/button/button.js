import React, {Component} from 'react';
import './button.scss';

class Button extends Component {
  render() {
    const {children, ...buttonProps} = this.props;
    return (
      <button className="Button" {...buttonProps}>
        {children}
      </button>
    );
  }
}

export default Button;
