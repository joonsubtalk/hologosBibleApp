import React, { Component } from 'react'

export default class Social extends Component {

  uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  render() {
    return (
      <div className="social">
        <div className="social__container">
          <div className="social__wrapper">
            <div className="social__groups">
              yo yo
            </div>
            <div className="social__cards">
              <div className="social__card">
                Social Blurbs will populate here...
              </div>
              <div className="social__card">
                {this.uuidv4()}
                <ul>
                  <li>Allow users to create groups</li>
                  <li>Allow users to join groups</li>
                  <li>manage / assign admins</li>
                  <li>See progress of members</li>
                  <li>Give kudos to members</li>
                  <li>Give nudges to members</li>
                  <li>See Rank between members</li>
                </ul>
              </div>
            </div>
            <button className="social__createGroup">Create Group</button>
          </div>
        </div>
      </div>
    )
  }
}
