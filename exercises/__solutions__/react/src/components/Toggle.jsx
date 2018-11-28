import React from 'react';

// https://egghead.io/lessons/react-use-render-props-with-react

export const Switch = ({ on, className = '', ...props }) => {
  return (
    <div className="toggle">
      <input className="toggle-input" type="checkbox" />
      <button className={`${className} toggle-btn ${on ? 'toggle-btn-on' : 'toggle-btn-off'}`} {...props} />
    </div>
  );
};

class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} };
  state = { on: false };
  toggle = () => {
    const newValue = !this.state.on;
    // set new state
    this.setState({
      on: !this.state.on,
    });
    // fire event
    this.props.onToggle(newValue);
  };
  render() {
    // return <Switch on={this.state.on} onClick={this.toggle} />;
    return this.props.render({ on: this.state.on, toggle: this.toggle });
  }
}

export default Toggle;
