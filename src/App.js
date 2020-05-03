import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
  };

  incrementHandler = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}{" "}
        </h1>
        <button data-test="increment-button" onClick={this.incrementHandler}>
          Increment counter
        </button>
      </div>
    );
  }
}
export default App;
