import React, {Component} from 'react';
import Checkbox from '../checkbox/checkbox';
import Input from '../input/input';
import './social-input.scss';

class SocialInput extends Component {
  render() {
    const {value, label, placeholder} = this.props;
    const showInput = value !== null;
    return (
      <div className="SocialInput">
        <div className="SocialInput-checkbox">
          <Checkbox
            checked={showInput}
            label={label}
            onChange={this.handleCheckboxChange}
          />
        </div>

        {showInput && (
          <div className="SocialInput-input">
            <Input
              small
              value={value}
              placeholder={placeholder}
              onChange={this.handleInputChange}
            />
          </div>
        )}
      </div>
    );
  }

  handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    this.props.onChange(checked ? '' : null);
  };

  handleInputChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
  };
}

export default SocialInput;
