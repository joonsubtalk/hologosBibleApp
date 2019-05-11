import React, { Component } from 'react'

export default class Chapter extends Component {
  render() {
    const {chapter} = this.props;
    return (
      <div className="chapter">
        <div className="chapter__container">
          <div className="chapter__number">
            {chapter}
          </div>
        </div>
      </div>
    )
  }
}
