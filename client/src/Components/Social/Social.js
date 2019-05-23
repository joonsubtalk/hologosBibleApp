import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Social extends Component {

  uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  // __createGroup = () => {
  //   console.log(shortid.generate());
  // }

  __createGroup = () => {
    const uuid = shortid.generate();
    console.log(uuid);
    this.props.postNewGroup(uuid, {
      uid: this.props.auth.uid,
      title: 'test'
    });
  }

  render() {

    const {auth} = this.props;

    return (
      <div className="social">
        <div className="social__container">
          <div className="social__wrapper">
            <div className="social__groups">
              <img className="social__whoami" src={auth && auth.photoURL} alt="face" />
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
            <button className="social__createGroup" onClick={this.__createGroup}>+ Create Group</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, actions)(Social);
