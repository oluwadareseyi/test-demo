import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
    counterError: false,
  };

  incrementHandler = () => {
    this.setState((prevState) => ({
      counterError: false,
      counter: prevState.counter + 1,
    }));
  };

  decrementHandler = () => {
    if (this.state.counter === 0) {
      this.setState({ counterError: true });
      return;
    }
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));
  };

  render() {
    const errorMessage = this.state.counterError ? (
      <h3 data-test="counter-error" className="error">
        Counter can't go below 0
      </h3>
    ) : null;

    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        {errorMessage}
        <button data-test="increment-button" onClick={this.incrementHandler}>
          Increment counter
        </button>
        <button data-test="decrement-button" onClick={this.decrementHandler}>
          Decrement counter
        </button>
      </div>
    );
  }
}
export default App;
