import React, {Component} from 'react';
import cn from 'classnames';
import './image-switch.scss';

function Button({option, active, ...rest}) {
  return (
    <button
      className={cn('ImageSwitch-option', {
        'ImageSwitch-option--active': active
      })}
      type="button"
      tabIndex="-1"
      {...rest}
    >
      <img
        className="ImageSwitch-picture"
        src={option.normal}
        srcSet={option.double && `${option.double} 2x`}
        alt={option.alt}
      />
    </button>
  );
}

class ImageSwitch extends Component {
  state = {};
  render() {
    const {options, value, onChange} = this.props;
    return (
      <div className="ImageSwitch">
        {options.map((item, index) => (
          <div className="ImageSwitch-optionHolder">
            <Button
              option={item}
              active={value && value.id === item.id}
              onClick={() => onChange(item)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ImageSwitch;
