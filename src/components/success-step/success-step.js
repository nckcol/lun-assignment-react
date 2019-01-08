import React, {Component} from 'react';
import Button from '../button/button';
import ResultBox from '../result-box/result-box';
import Step from '../step/step';

class SuccessStep extends Component {
  render() {
    const {
      personalInfo,
      cityTable,
      countryTable,
      location,
      social,
      confirmation,
      onRestart
    } = this.props;

    return (
      <Step final>
        <Step.Content>
          <ResultBox
            firstName={personalInfo.firstName}
            email={personalInfo.email}
            city={cityTable[location.cityId].name}
            country={countryTable[location.countryId]}
            social={social}
            confirmation={confirmation}
          />
        </Step.Content>
        <Step.Actions>
          <Button variant="primary" type="button" onClick={onRestart}>
            Пройти заново
          </Button>
        </Step.Actions>
      </Step>
    );
  }
}

export default SuccessStep;
