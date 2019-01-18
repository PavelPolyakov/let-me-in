import React, { Component } from "react";

import "bulma";
import "@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";


import { HashRouter as Router, Route, Switch } from "react-router-dom";

import AppContext from "./AppContext";
import Default from "./Default";
import NoMatch from "./NoMatch";

class App extends Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router basename="/">
          <Switch>
            <Route path="/" exact component={Default} />
            <Route path="/a" exact component={() => <div>aaa</div>} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
