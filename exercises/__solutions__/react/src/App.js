import React, { Component } from 'react';

import Button from './components/Button';
import SampleForm from './components/SampleFormWithFormikRenderProp';
import Toggle, { Switch } from './components/Toggle';

import { StoreProvider } from './components/StoreProvider';
import { Green, Red } from './components/RedGreenBlue';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>My App</h1>
        <Toggle
          onToggle={(e) => console.log(e)}
          render={({ on, toggle }) => (
            <div>
              <Switch on={on} onClick={toggle} />
              {on ? 'on' : 'off'}
            </div>
          )}
        />
        <hr />
        <SampleForm />
        <hr />
        <h3>Buttons</h3>
        <div className="btn-toolbar">
          <Button>Default</Button>
          <Button primary>Primary</Button>
          <Button danger>Don't click me</Button>
        </div>
        <hr />
        <h3>Context</h3>
        <StoreProvider initialValue={10}>
          <Green />
          <Red />
        </StoreProvider>
      </div>
    );
  }
}

// hot export to enable hot reloading of react components
export default App;
