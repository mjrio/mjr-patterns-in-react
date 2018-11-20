---
title: Patterns in React
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# Patterns in React

<img src="./images/react-patterns.jpg" width="300px"/><br>

<small>
by Peter Cosemans<br>
Copyright (c) 2018 Euricom nv.
</small>

<!-- markdownlint-disable -->
<br>
<style type="text/css">
.reveal section img {
    background:none;
    border:none;
    box-shadow:none;
}
.reveal h1 {
    font-size: 3.0em;
}
.reveal h2 {
    font-size: 2.00em;
}
.reveal h3 {
    font-size: 1.00em;
}
.reveal p {
    font-size: 70%;
}
.reveal blockquote {
    font-size: 100%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 100%;
}
</style>

---

# Props In Depth

> Know your props

<!-- prettier-ignore -->
***

## Spreading props

```jsx
class App extends Component {
  const obj = { firstName="peter", lastName="jansens" }
  render() {
    return (
        <Greeting firstName={obj.firstName}
                  lastName={obj.lastName} />
        )
  }
}
```

with spreading props

```jsx
class App extends Component {
  const obj = { firstName="peter", lastName="jansens" }
  render() {
    return <Greeting {...obj} />;
  }
}
```

<!-- prettier-ignore -->
***

### Spreading props

passing props from parent

```jsx
const FancyButton = props => (
  <button className="FancyButton" {...props}>
    {props.children}
  </button>
);

<FancyButton title="save the user">Save</FancyButton>;
```

<!-- prettier-ignore -->
***

## Validating

Validate props

```jsx
import PropTypes from 'prop-types';

function MyComponent(props) {
  return (
    <h3>{this.props.title}<h3>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

MyComponent.defaultProps = {
  count: 10
};
```

[React prop-types](https://github.com/facebook/prop-types)

<!-- prettier-ignore -->
***

### Validating

Validate with static members

```jsx
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static propTypes = {
    title:PropTypes.string.isRequired,
    count:PropTypes.number,
  };
  static defaultProps = {
    count: 10
  };
  render() {
    const { title, count } = this.props;
    return (
       <h3>{title}<h3>
       <p>{count * 100}</p>
    );
  }
}
```

Static members requires babel-preset-stage-2

---

# State In Depth

> Know your state

<!-- prettier-ignore -->
***

### Calculated state fields

Don't use state for calculated fields

```jsx
export default class MyComponent extends Component {
  constructor(props) {
    this.state = {
      fullName: `${props.firstName} ${props.lastName}`,
    };
  }
  render() {
    return <p>{this.state.fullName}</p>;
  }
}
```

Better

```jsx
export default class MyComponent extends Component {
  render() {
    const fullName = `${this.props.firstName} ${
      this.props.lastName
    }`;
    return <p>{fullName}</p>;
  }
}
```

<!-- prettier-ignore -->
***

## SetState is async

```js
this.setState({
  ...this.state,
  counter: 1,
});
console.log(this.state); // State is not updated yet
```

Fix: result callback

```js
this.setState(
    (state, props) => ({
        ...state
        counter: 1,
    }),
    (state) => {
        // now the state is changed
        consoler.log('new state: ', state)
    }
);
```

---

# Higher-Order Components

> A higher-order component is a function that takes a component and returns a new component.

<!-- prettier-ignore -->
***

### Higher-Order Component (HOC)

A sample

```jsx
import React from 'react';

const withSecretToLife = OrgComponent => {
  class HOC extends Component {
    render() {
      return (
        <OrgComponent secretToLife={42} {...this.props} />
      );
    }
  }
  return HOC;
};
export default withSecretToLife;
```

<!-- prettier-ignore -->
***

### Higher-Order Component

<!-- prettier-ignore -->
```js
import React from 'react';
import withSecretToLife from './withSecretToLife';

const App = props => (
  <div>
    The secret to life is {props.secretToLife}.
  </div>
)

export default withSecretToLife(App);
```

And use as a normal app component

```js
import App from './app.js';
render(<App />, element);
```

<!-- prettier-ignore -->
***

### Practical usecase

The HOC

```js
const withLogger = (prefix = '') => WrappedComponent => {
  const WithLogger = props => {
    console.log(`${prefix}[Props]:`, props);
    return <WrappedComponent {...props} />;
  };

  return HasLogger;
};
export default withLogger;
```

Enhance the component

```js
import withLogger form './withLogger';

const MyComponent = (props) => <h1>MyComponent</h1>

export default withLogger(MyComponent)
```

Logs props to the console on every render of the WrappedComponent.

[More Samples](https://medium.com/dailyjs/react-composing-higher-order-components-hocs-3a5288e78f55)

---

# Render Prop

> A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

<!-- prettier-ignore -->
***

## Basic Sample

<!-- prettier-ignore -->
```jsx
const SECRET_TO_LIFE = 42;

default export class ShareSecretToLife extends Component {
  render() {
    return <div>
        {this.props.render({ secretToLife: SECRET_TO_LIFE })}
    </div>;
  }
}
```

<!-- prettier-ignore -->
```js
const ShareSecretWithWorld = () => (
  <ShareSecretToLife render={({ secretToLife }) => (
      <h1>
        <b>{secretToLife}</b>
      </h1>
    )}
  />
);
```

<!-- prettier-ignore -->
***

### Render props - children

<!-- prettier-ignore -->
```jsx
const SECRET_TO_LIFE = 42;

default export class ShareSecretToLife extends Component {
  render() {
    return <div>
        {this.props.children({ secretToLife: SECRET_TO_LIFE })}
    </div>;
  }
}
```

<!-- prettier-ignore -->
```js
const ShareSecretWithWorld = () => (
  <ShareSecretToLife>
    {({ secretToLife }) => (
      <h1>
        <b>{secretToLife}</b>
      </h1>
    )}
  </ShareSecretToLife>
);
```

[More Samples](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)

<!-- prettier-ignore -->
***

## Exercise

Modify the ErrorBoudery with an render prop so we can custimize the error rendering

---

# Context

> Using context, we can avoid passing props through intermediate elements:

<!-- prettier-ignore -->
***

## Context

Provide a value

```jsx
const ThemeContext = React.createContext('light');
export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

export ThemeContext;
```

<!-- prettier-ignore -->
***

### Context

Some component deeper in the hierarchy...

```jsx
const Toolbar = props => <ThemedButton />;
```

Use a Consumer to read the current theme context. <br>React will find the closest theme Provider above and use its value.

```jsx
import ThemeContext from './themeContext';

const ThemedButton = props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```

Use the render prop to use it's valid

<!-- prettier-ignore -->
***

### contextType

Context simplified (available on React 16.6)

```jsx
import ThemeContext from './themeContext';
```

```jsx
const ThemedButton = (props, context) => (
  <Button {...props} theme={context.theme} />}
);
ThemedButton.contextType = ThemeContext;
```

```jsx
class ThemedButton2 extends React.Component {
  static contextType = ThemeContext;
  render() {
    <Button {...this.props} theme={this.context.theme} />}
  }
}
```

This method only allows you to consume one context.

<!-- prettier-ignore -->
***

### Context

Context can be a complex object

```jsx
export const ThemeContext = React.createContext({
  theme: 'dark',
  maxWidth: '800px',
  font: 'Helvetica',
  toggleTheme: () => {},
});
```

<!-- prettier-ignore -->
***

### Context - EXAMPLE

You can consuming Context with a HOC

```js
const ThemeContext = React.createContext('light');

export default (withTheme = Component => {
  // ...and returns another component...
  return props => {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
});
```

```js
const Button = ({ theme, ...rest }) => {
  return <button className={theme} {...rest} />;
};

const ThemedButton = withTheme(Button);
```

---

# Error<br>Boundery

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI

<!-- prettier-ignore -->
***

### ErrorBoundery: Basic Sample

```jsx
export default class ErrorBoundery extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error">Oops, error occured</div>;
    }
    return this.props.children;
  }
}
```

<!-- prettier-ignore -->
***

## Use of ErrorBoundery

```jsx
import ErrorBoundery from './errorBoundery';

const App = () => (
  <ErrorBoundary>
    <MyForm />
  </ErrorBoundary>;
)

export default App;
```

Error Bounderies can be placed on any level

<!-- prettier-ignore -->
***

## Exercise

ErrorBoundery with custom rendering

<!-- prettier-ignore -->
```jsx
export default class ErrorBoundery extends Component {
  static propTypes = {
    children: PropTypes.onOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    render: PropTypes.func.isRequired,
  };

  // ...

  render() {
    if (this.state.hasError) {
      // allow custom rendering of the error
      return this.props.render(
        this.state.error,
        this.state.errorInfo
      );
    }
    return this.props.children;
  }
}
```

---

# Resources

> Get the extra information

<!-- prettier-ignore -->
***

## Resources

Info

- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
- [Never Write Another HoC](https://www.youtube.com/watch?v=BcVAq3YFiuc)
- [8 no-Flux strategies for React component communication](https://www.javascriptstuff.com/component-communication/)
- [Beware: React setState is asynchronous!](https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3)

<!-- prettier-ignore -->
***

## Resources

Patterns

- [React component patterns](https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0)
- [Reusable Code Patterns](https://benmccormick.org/2016/01/08/reusable-code-patterns/)
- [ReactJS: Code Reuse Patterns](https://www.youtube.com/watch?v=0BNgi9vofaw)
- [React Patterns in a Nutshell](https://www.youtube.com/watch?v=C6w7R501oug)
- [Simple React Patterns](https://lucasmreis.github.io/blog/simple-react-patterns/)

---

# Ready to build you React Apps
