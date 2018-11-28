import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  state = {
    showText: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return {
        showText: !state.showText,
      };
    });
  };

  render() {
    const { showText } = this.state;
    return (
      <div className="container">
        <h1>My App</h1>
        <button className="btn btn-default" onClick={this.handleClick}>
          Click me
        </button>
        {showText && (
          <Fragment>
            <h2>The Secret of Life</h2>
            <p>
              When we first begin fighting for our dreams, we have no experience and make many mistakes. The secret of
              life, though, is to fall seven times and get up eight times.
            </p>
          </Fragment>
        )}
      </div>
    );
  }
}

// hot export to enable hot reloading of react components
export default App;
