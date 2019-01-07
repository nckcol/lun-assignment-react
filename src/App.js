import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Button from './components/button/button';
import StartStep from './components/start-step/start-step';
import LocationStep from './components/location-step/location-step';
import countryTable from './countries.json';
import cityTable from './cities.json';
import './App.css';

const countryList = Object.entries(countryTable).map(([id, name]) => ({
  id: parseInt(id, 10),
  name
}));

const cityList = Object.entries(cityTable).map(([id, city]) => ({
  ...city,
  id: parseInt(id, 10)
}));

class App extends Component {
  state = {
    personalInfo: null,
    location: null
  };
  render() {
    const {personalInfo, location} = this.state;
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-progress">
            <Button type="button">1</Button>
            <Button type="button" disabled>
              2
            </Button>
            <Button type="button" disabled>
              3
            </Button>
            <Button type="button" disabled>
              4
            </Button>
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
              <Route path="/social" exact render={() => <span>Social</span>} />
              <Route
                path="/confirm"
                exact
                render={() => <span>Confirm</span>}
              />
              <Route
                path="/success"
                exact
                render={() => <span>Success!</span>}
              />
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
}

export default App;
