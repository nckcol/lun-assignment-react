import React, {Component} from 'react';
import PropTypes from 'prop-types';

import isFunction from '../../utils/is-function';
import {KEY_RETURN, KEY_UP, KEY_DOWN, KEY_ESCAPE} from 'keycode-js';

import {ring, select} from './helpers/helpers';

import Autocomplete from './autocomplete';
import scrollIntoView from './helpers/scroll-into-view';

import getRelevantOptions from './helpers/get-relevant-options';

function filterOptions(options, query, filterFunction) {
  if (!query) {
    return options;
  }

  if (!isFunction(filterFunction)) {
    return getRelevantOptions(options, query);
  }

  return filterFunction(options, query);
}

class AutocompleteManager extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.any),
    selectTitle: PropTypes.func,
    onFilter: PropTypes.func
  };

  static defaultProps = {
    options: null,
    selectTitle: select('title'),
    selectValue: select('value')
  };

  state = {
    query: '',
    showOptions: false,
    highlightedOption: -1,
    inFocus: false
  };

  _optionElements = [];
  _inputElement = null;
  _listElement = null;

  render() {
    const {
      options,
      filterFunction,
      selectTitle,
      selectValue,
      value,
      ...rest
    } = this.props;
    const {query, highlightedOption} = this.state;

    const filteredOptions = filterOptions(options, query, filterFunction);
    const inputValue = this.getCurrentInputValue();
    const showOptions = this.hasToShowOptions();

    delete rest.query;

    return (
      <Autocomplete
        {...rest}
        showOptions={showOptions}
        value={inputValue}
        inputRef={this.handleInputRef}
        listRef={this.handleListRef}
        onClick={this.handleInputClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      >
        {filteredOptions.map((option, index) => (
          <Autocomplete.Option
            key={selectValue(option)}
            active={value === selectValue(option)}
            highlighted={highlightedOption === index}
            innerRef={this.handleOptionRef(index)}
            onClick={this.handleOptionClick(option)}
            onMouseDown={this.handleOptionMouseDown}
          >
            {selectTitle(option)}
          </Autocomplete.Option>
        ))}
      </Autocomplete>
    );
  }

  getCurrentInputValue() {
    const {query} = this.state;
    const {value} = this.props;

    const highlightedOption = this.getHighlightedOption();

    if (highlightedOption !== null) {
      return this.selectTitle(highlightedOption);
    }

    if (value) {
      return this.getTitleByValue(value);
    }

    return query;
  }

  getTitleByValue(value) {
    const {selectTitle} = this.props;
    const option = this.findOptionByValue(value);

    if (!option) {
      return null;
    }

    return selectTitle(option);
  }

  findOptionByValue(value) {
    const {options, selectValue} = this.props;

    for (let item of options) {
      if (selectValue(item) !== value) {
        continue;
      }

      return item;
    }

    return null;
  }

  getIndexByValue(value) {
    const {options, selectValue} = this.props;

    return options.map(selectValue).indexOf(value);
  }

  getHighlightedOption() {
    const {highlightedOption} = this.state;

    const options = this.getOptions();

    if (!this.isHighlighted()) {
      return null;
    }

    return options[highlightedOption];
  }

  getOptions() {
    const {options, filterFunction} = this.props;
    const {query} = this.state;

    return filterOptions(options, query, filterFunction);
  }

  change(option) {
    const {onChange, selectValue} = this.props;

    if (!isFunction(onChange)) {
      return;
    }

    if (!option) {
      onChange(null);
      return;
    }

    onChange(selectValue(option), option);
  }

  filter(query) {
    const {onFilter} = this.props;

    this.resetHighlighted();
    this.resetActive();

    this.setState({
      query,
      showOptions: true
    });

    // this.showOptions();

    if (isFunction(onFilter)) {
      onFilter(query);
    }
  }

  select() {
    if (this.isHighlighted()) {
      const {highlightedOption} = this.state;
      const options = this.getOptions();
      const option = options[highlightedOption];
      this.setActive(option);
      return;
    }

    if (this.isActiveOption()) {
      return;
    }

    this.resetActive();
  }

  selectTitle(option) {
    return this.props.selectTitle(option);
  }

  setActive(option) {
    this.setState({
      query: ''
    });

    this.change(option);
  }

  resetActive() {
    this.change(null);
  }

  showOptions() {
    this.setState({
      showOptions: true
    });

    if (this.isActiveOption()) {
      const {value} = this.props;
      const index = this.getIndexByValue(value);
      this.highlightOption(index);
    }
  }

  hideOptions() {
    this.setState({
      showOptions: false
    });
    this.resetHighlighted();
  }

  apply() {
    const {highlightedOption} = this.state;
    this.select(highlightedOption);
    this.hideOptions();
  }

  nextOption() {
    const {highlightedOption} = this.state;
    const options = this.getOptions();

    const ringln = ring(-1, options.length);
    const nextOption = ringln(highlightedOption + 1);

    this.highlightOption(nextOption);
  }

  prevOption() {
    const {highlightedOption} = this.state;
    const options = this.getOptions();

    const ringln = ring(-1, options.length);
    const prevOption = ringln(highlightedOption - 1);

    this.highlightOption(prevOption);
  }

  highlightOption(index) {
    this.setState({
      highlightedOption: index
    });

    if (index < 0) {
      return;
    }

    this.scrollToOption(index);
  }

  resetHighlighted() {
    this.setState({
      highlightedOption: -1
    });
  }

  /* Implement scroll list to option behaviour */
  scrollToOption(optionIndex) {
    const option = this._optionElements[optionIndex];
    const root = this._listElement;

    if (!option || !root) {
      this.scheduleScrollToOption(optionIndex);
      return;
    }

    scrollIntoView(option, root);
  }

  scrollToOptionSetTarget(target, index) {
    if (
      !target ||
      !this.__scheduledScrollToOption ||
      this.__scheduledScrollToOption.optionIndex !== index
    ) {
      return;
    }

    this.__scheduledScrollToOption.target = target;

    if (this.__scheduledScrollToOption.root) {
      this.scrollToOptionScheduled();
    }
  }

  scrollToOptionSetRoot(root) {
    if (!root || !this.__scheduledScrollToOption) {
      return;
    }

    this.__scheduledScrollToOption.root = root;

    if (this.__scheduledScrollToOption.target) {
      this.scrollToOptionScheduled();
    }
  }

  scheduleScrollToOption(optionIndex) {
    this.__scheduledScrollToOption = {
      optionIndex
    };

    const target = this._optionElements[optionIndex];
    const root = this._listElement;

    if (target) {
      this.__scheduledScrollToOption.target = target;
    }

    if (root) {
      this.__scheduledScrollToOption.root = root;
    }
  }

  scrollToOptionScheduled() {
    if (this.__scheduledScrollToOption) {
      const {target, root} = this.__scheduledScrollToOption;
      scrollIntoView(target, root);
    }

    this.__scheduledScrollToOption = null;
  }

  hasToShowOptions() {
    const {showOptions} = this.state;

    const options = this.getOptions();

    if (!options.length) {
      return false;
    }

    return showOptions;
  }

  isHighlighted() {
    const {highlightedOption} = this.state;

    return !(highlightedOption < 0);
  }

  isActiveOption() {
    const {value} = this.props;

    return value && this.findOptionByValue(value);
  }

  isFocused() {
    const {inFocus} = this.state;

    return inFocus;
  }

  focus() {
    this.setState({
      inFocus: true
    });
    this.showOptions();
  }

  blur() {
    this.setState({
      inFocus: false
    });
    this.hideOptions();
  }

  handleFocus = () => {
    const {onFocus} = this.props;

    this.focus();

    if (!isFunction(onFocus)) {
      return;
    }
    onFocus();
  };

  handleBlur = () => {
    const {onBlur} = this.props;

    this.blur();

    if (!isFunction(onBlur)) {
      return;
    }

    onBlur();
  };

  handleChange = (e) => {
    const query = e.target.value;
    this.filter(query);
  };

  handleKeyDown = (e) => {
    const code = e.which || e.keyCode;

    if (KEY_UP === code) {
      e.preventDefault();
      if (this.hasToShowOptions()) {
        this.prevOption();
        return;
      }
      this.showOptions();
      return;
    }

    if (KEY_DOWN === code) {
      e.preventDefault();
      if (this.hasToShowOptions()) {
        this.nextOption();
        return;
      }
      this.showOptions();
      return;
    }

    if (KEY_RETURN === code) {
      e.preventDefault();
      this.apply();
      return;
    }

    if (KEY_ESCAPE === code) {
      e.preventDefault();
      this.hideOptions();
      return;
    }

    return;
  };

  handleOptionClick = (option) => (e) => {
    e.preventDefault();
    this.setActive(option);
    this.hideOptions();
  };

  handleInputClick = (e) => {
    if (!this.isFocused() || this.hasToShowOptions()) {
      return;
    }

    this.showOptions();
  };

  handleOptionMouseDown = (e) => {
    e.preventDefault();
  };

  handleOptionRef = (index) => (element) => {
    this._optionElements[index] = element;
    this.scrollToOptionSetTarget(element, index);
  };

  handleListRef = (element) => {
    this._listElement = element;
    this.scrollToOptionSetRoot(element);
  };

  handleInputRef = (element) => {
    this._inputElement = element;
  };
}

export default AutocompleteManager;
