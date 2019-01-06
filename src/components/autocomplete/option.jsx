import React, {Component} from 'react';
import cn from 'classnames';
import IconContainer from 'modules/core/components/icon-container/icon-container';

import {mapSelectSizeToIcon} from './helpers';

import './option.css';

class Option extends Component {
  render() {
    const {
      children,
      active,
      highlighted,
      size,
      icon,
      innerRef,
      ...rest
    } = this.props;

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
          {icon && (
            <div className="AutocompleteOption-icon">
              <IconContainer size={mapSelectSizeToIcon(size)}>
                {icon}
              </IconContainer>
            </div>
          )}
          <div className="AutocompleteOption-title">{children}</div>
        </button>
      </li>
    );
  }
}

export default Option;
