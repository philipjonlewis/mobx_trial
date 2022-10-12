import React, { Component } from 'react';
import { ToDoStore } from './state/ToDoStore';
import './styles/index.scss';
import LandingPage from './views/LandingPage';

export default class App extends Component {
  state = { count: 65 };

  render() {
    return (
      <div className="bg-gray-900 h-screen text-white">
        <LandingPage ToDoStore={ToDoStore} />
      </div>
    );
  }
}
