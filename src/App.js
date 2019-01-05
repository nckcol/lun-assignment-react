import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import StartStep from './components/start-step/start-step';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-progress">
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">4</button>
          </div>
          <div className="App-content">
            <Switch>
              <Route path="/" exact component={StartStep} />
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
}

export default App;
