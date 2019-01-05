import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import StartStep from './components/start-step/start-step';
import Button from './components/button/button';

class App extends Component {
  render() {
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
          <div className="App-actions">
            <Button variant="accent">Назад</Button>
            <Button variant="accent">Далее</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
