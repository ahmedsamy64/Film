import React, { Component } from 'react';
import FilmPage from "./container/filmPage";
import FilmDetails from "./container/filmDetails"

class App extends Component {
  render() {
    return (
      <div>
        {/* <FilmPage /> */}
        <FilmDetails />
      </div>
    );
  }
}

export default App;
