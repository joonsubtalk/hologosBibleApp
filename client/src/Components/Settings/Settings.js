import React, { Component } from 'react';
import { connect } from 'react-redux';
import {format, compareDesc} from 'date-fns';
import * as actions from '../../actions';
import { VERSION_TRIBES } from '../../configs/constants';

class Settings extends Component {
  state = {
    date: '',
    today: '',
  }

  componentDidMount() {
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
    const formatedDate = profile.planStartDate
      ? format(profile.planStartDate, 'YYYY-MM-DD')
      : format(today, 'YYYY-MM-DD');
    this.setState({date : formatedDate});
    console.log(profile.planStartDate);
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
    const {date, today} = this.state;
    const {auth, profile} = this.props;
    const {tribe} = profile;
    return (
      <div className='settings'>
        Settings
        <img src={auth && auth.photoURL} alt="face" />
        <button onClick={this.props.signOut}>
          sign off
        </button>

        Set Start Date (todo)
        <input type="date"
          onChange={this.dateChangeHandler}
          name="trip-start"
          value={date}
          max={today} />
        <button onClick={this.saveDateHandler}>Save Date?</button>

        <div>
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

        <ul>
          <li>Allow users set new start date >> with warning</li>
          <li>Purchase Night Mode, or share referral code to gain achievement</li>
          <li>Message developer for bugs</li>
          <li>Toggle One year goals</li>
        </ul>
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
