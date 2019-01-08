import React, {Component, Children} from 'react';

class StepActions extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="Step-actions">
        {Children.map(children, (item, index) => (
          <div key={index} className="Step-actionHolder">
            {item}
          </div>
        ))}
      </div>
    );
  }
}

export default StepActions;
