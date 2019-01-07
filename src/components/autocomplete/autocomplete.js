import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Input from '../input/input';
import AutocompleteOption from './autocomplete-option';

import './autocomplete.scss';

class Autocomplete extends Component {
  static Option = AutocompleteOption;

  static propTypes = {
    showOptions: PropTypes.bool
  };

  render() {
    const {
      showOptions,

      listRef,
      inputRef,
      children,

      ...inputProps
    } = this.props;

    return (
      <div
        className={cn('Autocomplete', {
          'Autocomplete--isOpened': showOptions
        })}
      >
        <div className="Autocomplete-current">
          <div className="Autocomplete-input">
            <Input innerRef={inputRef} autoComplete="off" {...inputProps} />
          </div>
        </div>
        {showOptions && (
          <div className="Autocomplete-bottom">
            <div className="Autocomplete-optionListHolder">
              <ul className="Autocomplete-optionList" ref={listRef}>
                {children}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Autocomplete;
