import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Input from 'modules/form/components/input/input';

import Option from './option';

import './autocomplete.css';

class Autocomplete extends Component {
  static Option = Option;

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired
      })
    ),
    showOptions: PropTypes.bool
  };

  render() {
    const {
      showOptions,
      onInputClick,
      isLoading,
      options,

      highlightedOption,
      activeOptionIndex,
      size,
      listRef,
      selectTitle,

      onChange,
      onKeyDown,

      ...inputProps
    } = this.props;

    return (
      <div
        className={cn('Autocomplete', `Autocomplete--size-${inputProps.size}`, {
          'Autocomplete--isOpened': showOptions
        })}
      >
        <div className="Autocomplete-current">
          <div className="Autocomplete-input">
            <Input
              {...inputProps}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              onClick={onInputClick}
              appended={this.renderLoader()}
            />
          </div>
        </div>
        {showOptions && (
          <div className="Autocomplete-bottom">
            <div className="Autocomplete-optionListHolder">
              <ul className="Autocomplete-optionList" ref={listRef}>
                {options.map((option, index) => (
                  <Option
                    active={activeOptionIndex === index}
                    highlighted={highlightedOption === index}
                    size={size}
                    onClick={this.handleOptionClick(index)}
                    onMouseDown={this.handleOptionMouseDown(index)}
                    innerRef={this.handleOptionRef(index)}
                  >
                    {selectTitle(option)}
                  </Option>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  handleInputChange = (e) => {
    const {onChange} = this.props;
    const {value} = e.target;
    onChange(value);
  };

  handleKeyDown = (e) => {
    const {onKeyDown} = this.props;
    const {keyCode, which} = e;
    onKeyDown(which || keyCode, e);
  };

  handleOptionRef = (index) => (element) => {
    const {optionRef} = this.props;
    optionRef(element, index);
  };

  handleOptionClick = (index) => (event) => {
    const {onOptionClick} = this.props;
    onOptionClick(event, index);
  };

  handleOptionMouseDown = () => (e) => {
    e.preventDefault();
  };
}

export default Autocomplete;
