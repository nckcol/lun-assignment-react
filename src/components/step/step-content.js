import React, {Component} from 'react';

class StepContent extends Component {
  render() {
    const {children} = this.props;
    return <div className="Step-content">{children}</div>;
  }
}

export default StepContent;
