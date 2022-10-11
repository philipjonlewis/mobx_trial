import React, { Component } from 'react';

export default class App extends Component {
  state = { count: 65 };
  render() {
    return <div>App {this.state.count}</div>;
  }
}
