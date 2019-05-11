import React, { Component } from 'react';
import Login from '../Login/Login';

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        Hello,
        <Login {...this.props} />
      </div>
    )
  }
}
