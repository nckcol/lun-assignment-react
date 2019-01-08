import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Button from './components/button/button';
import StartStep from './components/start-step/start-step';
import LocationStep from './components/location-step/location-step';
import SocialStep from './components/social-step/social-step';
import ConfirmationStep from './components/confirmation-step/confirmation-step';
import countryTable from './countries.json';
import cityTable from './cities.json';
import animalTable from './animals.json';
import './App.css';

const countryList = Object.entries(countryTable).map(([id, name]) => ({
  id: parseInt(id, 10),
  name
}));

const cityList = Object.entries(cityTable).map(([id, city]) => ({
  ...city,
  id: parseInt(id, 10)
}));

const animalList = Object.entries(animalTable).map(([id, animal]) => ({
  ...animal,
  id: parseInt(id, 10)
}));

function shuffle(list) {
  return list.sort(() => Math.random() - 0.5);
}

function Progress({steps, active}) {
  return (
    <Route
      path="/:name?"
      render={({location, history}) => {
        const currentIndex = steps.indexOf(location.pathname);
        return steps.map((path, index) => (
          <Button
            type="button"
            variant={index !== currentIndex && 'accent'}
            disabled={!active[index]}
            onClick={(e) => {
              e.preventDefault();
              if (index === currentIndex) return;
              history.push(path);
            }}
          >
            {index + 1}
          </Button>
        ));
      }}
    />
  );
}

class App extends Component {
  state = {
    personalInfo: null,
    location: null,
    social: null,
    confirmation: null
  };

  state = {
    personalInfo: {
      firstName: 'Nick',
      email: 'nckcol@gmail.com'
    },
    location: {
      countryId: 1,
      cityId: 1
    },
    social: {},
    confirmation: null
  };

  componentWillMount() {
    this.shuffledAnimalList = shuffle(animalList);
  }

  render() {
    const {personalInfo, location, social, confirmation} = this.state;

    const donePersonalInfo = personalInfo !== null;
    const doneLocation = location !== null;
    const doneSocial = social !== null;
    const doneConfirmation = confirmation !== null;

    return (
      <div className="App">
        <div className="App-container">
          <div className="App-progress">
            <Progress
              steps={['/', '/location', '/social', '/confirm']}
              active={[
                true,
                donePersonalInfo,
                doneLocation,
                doneSocial,
                doneConfirmation
              ]}
            />
          </div>
          <div className="App-content">
            <Switch>
              <Route
                path="/"
                exact
                render={({history}) => (
                  <StartStep
                    personalInfo={personalInfo}
                    onSubmit={this.handleStartStepSubmit(history)}
                  />
                )}
              />
              {donePersonalInfo && (
                <Route
                  path="/location"
                  exact
                  render={({history}) => (
                    <LocationStep
                      hasPrevious
                      countryList={countryList}
                      cityList={cityList}
                      location={location}
                      onSubmit={this.handleLocationStepSubmit(history)}
                    />
                  )}
                />
              )}
              {doneLocation && (
                <Route
                  path="/social"
                  exact
                  render={({history}) => (
                    <SocialStep
                      hasPrevious
                      social={social}
                      onSubmit={this.handleSocialStepSubmit(history)}
                    />
                  )}
                />
              )}
              {doneSocial && (
                <Route
                  path="/confirm"
                  exact
                  render={({history}) => (
                    <ConfirmationStep
                      hasPrevious
                      animalOptions={this.shuffledAnimalList}
                      confirmation={confirmation}
                      onSubmit={this.handleConfirmationStepSubmit(history)}
                    />
                  )}
                />
              )}
              {doneConfirmation && (
                <Route
                  path="/success"
                  exact
                  render={() => <span>Success!</span>}
                />
              )}
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }

  handleStartStepSubmit = (history) => (personalInfo) => {
    this.setState({
      personalInfo
    });
    history.push('/location');
  };

  handleLocationStepSubmit = (history) => (location) => {
    this.setState({
      location
    });
    history.push('/social');
  };

  handleSocialStepSubmit = (history) => (social) => {
    this.setState({
      social
    });
    history.push('/confirm');
  };

  handleConfirmationStepSubmit = (history) => (confirmation) => {
    this.setState({
      confirmation
    });
    history.push('/success');
  };
}

export default App;
