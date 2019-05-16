import React, { Component } from 'react';
import { connect } from 'react-redux';
import {format, compareDesc} from 'date-fns';
import * as actions from '../../actions';
import { VERSION_TRIBES } from '../../configs/constants';
import Goals from '../Goals/Goals';

class Settings extends Component {
  state = {
    date: '',
    today: '',
    userMessage: '',
  }

  componentDidMount() {
    const date = this.props.profile.planStartDate
      ? this.props.profile.planStartDate
      : new Date();
    this.setState({date: this.props.profile.planStartDate});
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile) {
      this.setDate();
    }
  }

  setDate = (date) => {
    const { profile } = this.props;
    const today = new Date();
    const formatedDate = profile && profile.planStartDate
      ? format(profile.planStartDate, 'YYYY-MM-DD')
      : format(today, 'YYYY-MM-DD');
    this.setState({date : formatedDate});
  }

  postComment = () => {
    const {userMessage} = this.state;
    const {auth} = this.props;
    const messageObj = {
      message: userMessage,
      email: auth.email,
      name: auth.displayName,
    }

    this.props.postMessage(auth.uid, messageObj, format(new Date(), 'YYYY-MM-DD::HH:mm:ss'))
    this.setState({userMessage: ''})
  }

  commentHandler = (evt) => {
    const message = evt.target.value;
    this.setState({userMessage: message});
  }

  dateChangeHandler = (evt) => {
    const setDate = evt.target.value;
    const today = new Date();
    const formatedToday = format(today, 'YYYY-MM-DD');
    compareDesc(formatedToday, setDate) > -1
      ? this.setState({date : formatedToday})
      : this.setState({date : setDate})
  }

  tribeChangeHandler = (evt) => {
    const { auth, setTribe } = this.props;
    const tribe = evt.target.value;
    setTribe(auth.uid, {tribe});
  }

  saveDateHandler = () => {
    this.props.setStartDate(this.props.auth.uid, {planStartDate: this.state.date});
  }

  render() {
    const {date, today, userMessage} = this.state;
    const {auth, profile} = this.props;
    const tribe = profile && profile.tribe
      ? profile.tribe
      : 'none';
    return (
      <div className='settings'>
        <div className="settings__container">
          <div className="settings__header">Settings</div>
          <div className="settings__section">
            <button className="settings__signout" onClick={this.props.signOut}>
            Sign Out
            </button>
          </div>
          <div className="settings__section">
            Start Date
            <input type="date" className="settings__date"
              onChange={this.dateChangeHandler}
              value={date}
              max={today} />
            <button onClick={this.saveDateHandler}>Save Date?</button>
            <p className="settings__warning">Note: changing start date will erase all your progress.</p>
          </div>
          <div className="settings__section">
              Select your tribe:
              <select onChange={this.tribeChangeHandler} value={tribe}>
                {
                  VERSION_TRIBES.map((tribe)=>{
                    const {initials, title} = tribe;
                    return <option value={initials} key={initials}>{title}</option>
                  })
                }
              </select>
          </div>
          <div className="settings__section">
              <h2>Bug? Suggestions?</h2>
              <textarea onChange={this.commentHandler} value={userMessage} placeholder="What would you like to say?"/>
              <button onClick={this.postComment} disabled={userMessage.length < 10}>send comment</button>
          </div>
          <div className="settings__section">
            <h3>Goals:</h3>
              <p>Not everyone's goals is to read the whole bible in a year.</p>
              <pre>
              What are your goals?<br />
              Read whole bible<br />
              Read Just NT<br />
              Custom<br />
                ><br />
                Goals:  | Exclude:<br />
              </pre>
              <Goals />
          </div>
          <div className="settings__section">
            <ul>
              <li>Purchase Night Mode, or share referral code to gain achievement</li>
              <li>Toggle One year goals</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile
  };
};

export default connect(mapStateToProps, actions)(Settings);
