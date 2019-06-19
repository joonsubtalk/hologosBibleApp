import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import { connect } from 'react-redux';
import {format} from 'date-fns';
import * as actions from '../../actions';
import Modal from '../Modal/Modal';
import Group from '../Group/Group';


const MONTH_OFFSET = 31;

class Social extends Component {

  state = {
    showModal: false,
    readSocialFeed: [],
    socialCalendar: [],
  }

  // uuidv4 = () => {
  //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  //   )
  // }

  componentDidMount() {
    if (this.props.profile && this.props.profile.groups) {
      for (let key in this.props.profile.groups) {
        if (this.props.profile.groups.hasOwnProperty(key)) {
          this.props.fetchGroup(key)
        }
      }
    }

    if (this.props.group) {
      this.__sortGroupFeed();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile && this.props.profile.groups) {
      for (let key in this.props.profile.groups) {
        if (this.props.profile.groups.hasOwnProperty(key)) {
          this.props.fetchGroup(key)
        }
      }
    }

    if (this.props.group !== prevProps.group) {
      this.__sortGroupFeed();
    }
  }

  __calculateYearlyReport = (read, name) => {

    const val = _.chain(read).map((readChapters, bid)=>{
      return _.chain(readChapters)
      .map(({...timestamp}, chapter) => {
        return {...timestamp, bid, chapter: Number.parseInt(chapter), name}
      })
      .filter(obj => obj.timestamp)
      .values()
      .value()
    }).flatten()
    .value()

    return val;
  }

  __sortGroupFeed = () => {
    const {members} = this.props.group;

    if (!members) return;
    let socialGroupArray = []
    const newArr = new Array(MONTH_OFFSET * 12)
    for(let a = 0, value = null, size = newArr.length; a < size; a++) newArr[a] = value;

    // why for loops? perf.
    for (let memberId = 0; memberId < members.length; memberId ++) {
      for (var key in members[memberId]) {
        if (members[memberId].hasOwnProperty(key)) {
          socialGroupArray = [...socialGroupArray, ...this.__calculateYearlyReport(members[memberId][key], key)]
        }
      }
    }

    socialGroupArray.forEach(chapter =>{
      if (chapter.timestamp !== -1) {
        const readDate = format(new Date(chapter.timestamp), 'MMDD');
        const idx = MONTH_OFFSET * readDate.substring(0,2) + Number.parseInt(readDate.substring(2));
        if (newArr[idx] === null)
          newArr[idx] = [chapter];
        else {
          newArr[idx] = [...newArr[idx], chapter];
        }
      }
    })

    this.setState({readSocialFeed: newArr});
  }

  __toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  __createGroupHandler = (title) => {
    this.__toggleModal();
    this.__createGroup(title);
  }

  __createGroup = (title) => {
    const uuid = shortid.generate();
    console.log(uuid);
    this.props.postNewGroup(uuid, {
      title,
      date: new Date(),
      admin: this.props.auth.uid,
    });
  }

  render() {

    const {auth, group} = this.props;
    const { showModal, readSocialFeed } = this.state;

    const today = format(new Date(), 'MMDD');
    const idx = MONTH_OFFSET * Number.parseInt(today.substring(0,2)) + Number.parseInt(today.substring(2))
    const weekReport = readSocialFeed.slice(idx-6,idx+1);

    return (
      <div className="social">
        {showModal && <Modal closeHandler={this.__toggleModal} createHandler={this.__createGroupHandler} /> }
        <div className="social__container">
          <div className="social__wrapper">
            <div className="social__groups">
              <img className="social__whoami" src={auth && auth.photoURL} alt="face" />
            </div>
            <div className="social__cards">
              <div className="social__card">
                Social Blurbs will populate here...
              </div>
              {
                weekReport &&
                group &&
                group.members &&
                _.reverse(weekReport).map((report, idx)=>{
                  const {title} = group;
                  if (!report) return null;
                  return <Group key={idx} title={title} report={report} />
                })
              }
              <div className="social__card">
                <ul>
                  <li>Allow users to join groups</li>
                  <li>manage / assign admins</li>
                  <li>See progress of members</li>
                  <li>Give kudos to members</li>
                  <li>Give nudges to members</li>
                  <li>See Rank between members</li>
                </ul>
              </div>
            </div>
            <button className="social__createGroup" onClick={this.__toggleModal}>+ Create Group</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile, group }) => {
  return {
    auth,
    profile,
    group,
  };
};

export default connect(mapStateToProps, actions)(Social);
