import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { VERSION_TRIBES } from '../../configs/constants';
import * as actions from '../../actions';

import Username from './Username';
import Tribe from './Tribe';
import DateSelection from './DateSelection';
import JoinGroup from './JoinGroup';
import PreSelection from './PreSelection';

class Setup extends Component {

  state = {
    username: null,
    version: null,
    startDate: null,
    groupId: '',
    unlockNextStep: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.profile && prevProps.profile){
      if (prevProps.profile.username !== this.props.profile.username) {
        if (this.props.profile.username) {
          this.setState({unlockNextStep: true, username: this.props.profile.username});
        } else if (this.props.auth.displayName) {
          this.setState({unlockNextStep: true, username: this.props.auth.displayName});
        }
      }
      if (prevProps.profile.tribe !== this.props.profile.tribe) {
        if (this.props.profile.tribe) {
          this.setState({unlockNextStep: true, version: this.props.profile.tribe});
        }
      }
      if (prevProps.profile.planStartDate !== this.props.profile.planStartDate) {
        if (this.props.profile.planStartDate) {
          this.setState({unlockNextStep: true, startDate: this.props.profile.planStartDate});
        }
      }
    }
  }

  nameHandler = (evt) => {
    this.setState({username: evt.target.value});
    if (evt.target.value !== '') {
      this.setState({unlockNextStep: true});
    }
  }

  joinGroup = (evt) => {
    const {groupId} = this.state;
    evt.preventDefault();
    this.props.setGroupJoin(this.props.auth.uid,
      groupId,
      {[this.props.auth.uid]: new Date()},
      {[groupId]: new Date()});
  }

  groupInputHandler = (evt) => {
    this.setState({groupId: evt.target.value});
  }

  saveDateHandler = (evt, {date, skip}) => {
    this.props.setStartDate(this.props.auth.uid, {planStartDate: date});
    if (skip) {
      const setupPage = Number.parseInt(this.props.match.params.pid);
      this.props.history.push(`/setup/${setupPage+3}`);
    }
  }

  versionHandler = (evt) => {
    this.setState({version: evt.currentTarget.dataset.version, unlockNextStep: true});
  }

  resetNextStepHandler = () => {
    const {auth, match} = this.props;
    const setupPage = Number.parseInt(match.params.pid);
    if (setupPage === 1) {
      this.props.setUsername(auth.uid, {username: this.state.username});
    }
    else if (setupPage === 2) {
      this.props.setTribe(auth.uid, {tribe: this.state.version});
    }
    else if (setupPage === 4) {
        debugger;
    }
  }

  render() {
    const {auth: {displayName}, match, profile, group} = this.props;
    const {username, version, unlockNextStep, startDate, groupId} = this.state;
    const setupPage = Number.parseInt(match.params.pid);
    const hasFilledProfile = profile &&
      profile.tribe &&
      profile.username &&
      profile.groups;

    return (
      <div className="setup">
        <div className="setup__container">
          <form>
          {
            setupPage === 1 &&
            <Username username={username} nameHandler={this.nameHandler} />
          }
          {
            setupPage === 2 &&
            <Tribe versions={VERSION_TRIBES} selectedVersion={version} clickHandler={this.versionHandler} />
          }
          {
            setupPage === 3 &&
            (
              <DateSelection saveDateHandler={this.saveDateHandler} />
            )
          }
          {
            setupPage === 4 &&
            (
              <DateSelection saveDateHandler={this.saveDateHandler} showMore={true}/>
            )
          }
          {
            setupPage === 5 &&
            (
              <PreSelection />
            )
          }
          {
            setupPage === 6 &&
            (
              <JoinGroup
                joinGroupHandler={this.joinGroup}
                groupInputHandler={this.groupInputHandler}
                groupId={groupId}
                successGroupTitle={group && group.title}
                errorGroupTitle={group && group.error}
              />
            )
          }
          </form>
            <div className="setup__actionable">
              <Link onClick={this.resetNextStepHandler} to={{ pathname: setupPage > 5 ? '/home' : `/setup/${setupPage+1}` }}>
                { setupPage !== 3 && setupPage !== 4 &&
                  <button className="setup__next">{setupPage > 5 ? 'Finish' : 'Next'}</button>
                }
              </Link>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ data, auth, profile, group }) => {
  return {
    data,
    auth,
    profile,
    group
  };
};

export default connect(mapStateToProps, actions)(Setup);
