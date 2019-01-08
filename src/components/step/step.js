import React, {Component} from 'react';
import cn from 'classnames';
import './step.scss';
import StepActions from './step-actions';
import StepContent from './step-content';

class Step extends Component {
  static Actions = StepActions;
  static Content = StepContent;

  render() {
    const {title, final, children} = this.props;
    return (
      <div className={cn('Step', {'Step--final': final})}>
        {title && (
          <div className="Step-header">
            <h2 className="Step-title">{title}</h2>
          </div>
        )}
        {children}
      </div>
    );
  }
}

export default Step;
