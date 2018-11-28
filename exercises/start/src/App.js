import React, { Component, Fragment } from 'react';

import Button from './components/Button';
import SampleForm from './components/SampleForm';
import { Red, Green } from './components/RedGreenBlue';

class App extends Component {
  state = {
    showText: false,
    number: 0,
  };

  handleClick = () => {
    this.setState((state) => {
      return {
        showText: !state.showText,
      };
    });
  };

  handleIncrement = () => {
    this.setState((state) => {
      return {
        number: state.number + 1,
      };
    });
  };

  render() {
    const { showText } = this.state;
    return (
      <div className="container">
        <h1>My App</h1>
        <hr />
        <button className="btn btn-default" onClick={this.handleClick}>
          Show me the secret to life
        </button>
        {showText && (
          <Fragment>
            <h2>The Secret to Life</h2>
            <p>
              When we first begin fighting for our dreams, we have no experience and make many mistakes. <br /> The
              secret of life, though, is to fall seven times and get up eight times.
            </p>
          </Fragment>
        )}
        <hr />
        <h2>Buttons</h2>
        <div className="btn-toolbar">
          <button className="btn btn-default">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-danger">Don't click me</button>
        </div>
        <hr />
        <h2>Form</h2>
        <SampleForm />

        <hr />
        <h2>Prop Drilling</h2>
        <div>
          <Red number={this.state.number} />
          <Green number={this.state.number} onIncrement={this.handleIncrement} />
        </div>
      </div>
    );
  }
}

// hot export to enable hot reloading of react components
export default App;
