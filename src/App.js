import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import StartStep from './components/start-step/start-step';
import Button from './components/button/button';

class App extends Component {
  state = {
    personalInfo: null
  };
  render() {
    const {personalInfo} = this.state;
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
                render={() => <span>Location</span>}
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
}

export default App;
