import React, { Component } from 'react';

export const Green = (props) => (
  <div className="green">
    <p>{props.number}</p>
    <button className="btn btn-default" onClick={props.onIncrement}>
      Inc
    </button>
    <Blue number={props.number} />
  </div>
);

export const Red = (props) => <div className="red">{props.number}</div>;

export class Blue extends Component {
  render() {
    return (
      <div className="blue">
        <p>{this.props.number}</p>
      </div>
    );
  }
}
