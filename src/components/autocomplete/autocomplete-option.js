import React, {Component} from 'react';
import cn from 'classnames';
import './option.scss';

class AutocompleteOption extends Component {
  render() {
    const {children, active, highlighted, innerRef, ...rest} = this.props;

    return (
      <li className="Autocomplete-option">
        <button
          type="button"
          className={cn('AutocompleteOption', {
            'AutocompleteOption--active': active,
            'AutocompleteOption--highlighted': highlighted
          })}
          ref={innerRef}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </button>
      </li>
    );
  }
}

export default AutocompleteOption;
