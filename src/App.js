import React, { Component } from 'react';
import FilmPage from "./container/filmPage";
import FilmDetails from "./container/filmDetails"
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";


class App extends Component {
  render() {
    return (
      <main >
        <Switch>
          <Route key="filmPage" exact path="/" component={FilmPage} />
          <Route ket="filmDetails" exact path="/movie/:id" component={FilmDetails} />
        </Switch>
      </main>
    );
  }
}

export default App;
