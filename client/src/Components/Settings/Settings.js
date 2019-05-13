import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Settings extends Component {
  render() {
    const {photoURL} = this.props.auth;
    return (
      <div className='settings'>
        Settings
        <img src={photoURL} alt="face" />
        <button onClick={this.props.signOut}>
          sign off
        </button>

        Set Start Date (todo)
        <input type="date" name="trip-start"
          value="2018-07-22"
          min="2018-01-01" max="2018-12-31" />

        <ul>
          <li>Allow users set new start date >> with warning</li>
          <li>Purchase Night Mode, or share referral code to gain achievement</li>
          <li>Message developer for bugs</li>
          <li>Sign out</li>
          <li>Toggle Version Camp</li>
          <li>Toggle One year goals</li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, actions)(Settings);
