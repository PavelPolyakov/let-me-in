import React, { Component } from "react";

import "bulma";
import "../node_modules/bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import AppContext from "./AppContext";
import ProfileEdit from "./ProfileEdit";
import ProfileAdd from "./ProfileAdd";
import ProfilesList from "./ProfilesList";
import NoMatch from "./NoMatch";

class App extends Component {
  state = {};

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router basename="/">
          <Switch>
            <Route path="/" exact component={ProfilesList} />
            <Route path="/profile/edit/:id" exact component={ProfileEdit} />
            <Route path="/profile/add" exact component={ProfileAdd} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
