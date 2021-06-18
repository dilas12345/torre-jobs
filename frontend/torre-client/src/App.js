import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';

class App extends Component {
  render(){
    return(
      <div>
        <div>
          <Switch>
            <Route exact path={["/", "home"]} component={Home}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
