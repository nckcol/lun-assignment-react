import React, {Component} from 'react';
import PropTypes from 'prop-types';

import isFunction from 'modules/utils/is-function';
import {KEY_RETURN, KEY_UP, KEY_DOWN} from 'keycode-js';

import {ring, select} from './helpers';

import Autocomplete from './autocomplete';
import scrollIntoView from './scroll-into-view';

// import getRelevantOptions from './get-relevant-options';

const options = [];

class AutocompleteManager extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.any),
    selectTitle: PropTypes.func,
    onFilter: PropTypes.func
  };

  static defaultProps = {
    options: null,
    selectTitle: select('value'),
    onFilter: null
  };

  state = {
    options,
    value: this.props.query || '',

    showOptions: false,
    highlightedOption: -1,
    activeOptionIndex: -1,
    activeOption: null,
    inFocus: false
  };

  _optionElements = [];
  _inputElement = null;
  _listElement = null;

  render() {
    const {...rest} = this.props;
    const {highlightedOption, activeOptionIndex} = this.state;

    const filteredOptions = this.getFilteredOptions();
    const value = this.getCurrentValue();
    const showOptions = this.isNeedToShowOptions();

    delete rest.onChange;
    delete rest.query;
    delete rest.value;
    delete rest.defaultValue;

    return (
      <Autocomplete
        {...rest}
        options={filteredOptions}
        value={value}
        highlightedOption={highlightedOption}
        activeOptionIndex={activeOptionIndex}
        showOptions={showOptions}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onInputClick={this.handleInputClick}
        onOptionClick={this.handleOptionClick}
        onKeyDown={this.handleKeyDown}
        optionRef={this.handleOptionRef}
        inputRef={this.handleInputRef}
        listRef={this.handleListRef}
      />
    );
  }

  getCurrentValue() {
    const {value} = this.state;
    const highlightedOption = this.getHighlightedOption();

    if (highlightedOption !== null) {
      return this.selectTitle(highlightedOption);
    }

    return value;
  }

  getHighlightedOption() {
    const {highlightedOption} = this.state;

    const options = this.getOptions();

    if (!this.isHighlighted()) {
      return null;
    }

    return options[highlightedOption];
  }

  getFilteredOptions() {
    const {filterFunction} = this.props;
    const {query} = this.state;

    const options = this.getOptions();

    if (!isFunction(filterFunction)) {
      return options;
    }

    return filterFunction(options, query);

    // return getRelevantOptions(options, query);
  }

  getOptions() {
    if (this.props.options) {
      return this.props.options;
    }

    return this.state.options;
  }

  change(value, option) {
    const {onChange} = this.props;

    if (isFunction(onChange)) {
      onChange({
        value,
        option
      });
    }
  }

  filter(query) {
    const {onFilter} = this.props;

    this.resetHighlighted();
    this.resetActive();

    this.setState({
      value: query,
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
      this.setActive(highlightedOption);
      return;
    }

    if (this.isActiveOption()) {
      return;
    }

    this.resetActive();

    const {value} = this.state;

    this.change(value);
  }

  selectTitle(option) {
    return this.props.selectTitle(option);
  }

  setActive(index) {
    const options = this.getOptions();

    const activeOption = options[index];

    this.setState({
      activeOption,
      activeOptionIndex: index,
      value: this.selectTitle(activeOption)
    });

    this.change(this.selectTitle(activeOption), activeOption);
  }

  resetActive() {
    this.setState({
      activeOption: null,
      activeOptionIndex: -1
    });
  }

  showOptions() {
    this.setState({
      showOptions: true
    });

    if (this.isActiveOption()) {
      const {activeOptionIndex} = this.state;
      this.highlightOption(activeOptionIndex);
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
    // this.showOptions();

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

  isNeedToShowOptions() {
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
    const {activeOptionIndex, activeOption} = this.state;

    return activeOption && !(activeOptionIndex < 0);
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
    this.apply();
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

  handleChange = (query) => {
    this.filter(query);
  };

  handleKeyDown = (code, e) => {
    if (KEY_UP === code) {
      e.preventDefault();
      if (this.isNeedToShowOptions()) {
        this.prevOption();
        return;
      }
      this.showOptions();
      return;
    }

    if (KEY_DOWN === code) {
      e.preventDefault();
      if (this.isNeedToShowOptions()) {
        this.nextOption();
        return;
      }
      this.showOptions();
      return;
    }

    if (KEY_RETURN === code) {
      e.preventDefault();
      this.apply();
    }

    return;
  };

  handleOptionClick = (e, index) => {
    this.setActive(index);
    this.hideOptions();
  };

  handleInputClick = () => {
    if (!this.isFocused() || this.isNeedToShowOptions()) {
      return;
    }

    this.showOptions();
  };

  handleOptionRef = (element, index) => {
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
