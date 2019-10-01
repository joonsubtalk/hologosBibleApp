import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import { connect } from 'react-redux';
import {format, subMilliseconds} from 'date-fns';
import * as actions from '../../actions';
import Modal from '../Modal/Modal';
import Group from '../Group/Group';
import star from '../../img/star.svg';


const MONTH_OFFSET = 31;

class Social extends Component {

  state = {
    showModal: false,
    readSocialFeed: [],
    socialCalendar: [],
    memberArr: [],
    leaderBoard: [],
    currentView: 'WEEKLY',
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

  __calculateYearlyReport = (read, name, tribe, id, photoURL) => {

    const val = _.chain(read).map((readChapters, bid)=>{
      return _.chain(readChapters)
      .map(({...timestamp}, chapter) => {
        return {...timestamp, bid, chapter: Number.parseInt(chapter), name, tribe, id, photoURL}
      })
      .filter(obj => obj.timestamp)
      .values()
      .value()
    }).flatten()
    .value()

    return val;
  }

  __sortGroupFeed = async () => {
    const {members} = this.props.group;

    if (!members) return;
    let socialGroupArray = []
    const newArr = new Array(MONTH_OFFSET * 12)
    for(let a = 0, value = null, size = newArr.length; a < size; a++) newArr[a] = value;

    // why for loops? perf.
    for (let memberId = 0; memberId < members.length; memberId ++) {
      for (var key in members[memberId]) {
        if (members[memberId].hasOwnProperty(key)) {
          socialGroupArray = [...socialGroupArray, ...this.__calculateYearlyReport(members[memberId][key], key, members[memberId].tribe ? members[memberId].tribe : '', members[memberId].id, members[memberId].photoURL ? members[memberId].photoURL : null )]
        }
      }
    }

    let currentBookId = -1;
    socialGroupArray.forEach(async chapter =>{

      if (chapter.timestamp !== -1) {
        const readDate = format(new Date(chapter.timestamp), 'MMDD');
        const idx = MONTH_OFFSET * readDate.substring(0,2) + Number.parseInt(readDate.substring(2));
        if (newArr[idx] === null)
          newArr[idx] = [chapter];
        else {
          newArr[idx] = [...newArr[idx], chapter];
        }


        // check if it's complete and within time
        if (currentBookId !== chapter.bid) {
          currentBookId = chapter.bid;
          var currentMember = members.filter(obj => {
            return obj.hasOwnProperty(chapter.name)
          })

          if (currentMember && currentMember[0][chapter.name][currentBookId][0] ) {
            const model = {
              bid: null,
              id: null,
              name: null,
              tribe: null,
              photoURL: null,
            };
            const newBook = _.pick(chapter, _.keys(model));
            const offsetTimestamp = subMilliseconds(currentMember[0][chapter.name][currentBookId][0], 42).getTime()
            const modifiedBook = Object.assign({}, newBook, {timestamp: offsetTimestamp});
            const readDate = format(new Date(modifiedBook.timestamp), 'MMDD');
            const idx = MONTH_OFFSET * readDate.substring(0,2) + Number.parseInt(readDate.substring(2));
            // newArr[idx] = [...newArr[idx], modifiedBook];
            const tempArr = newArr[idx]
            if (tempArr) {
              tempArr.push(modifiedBook);
              newArr[idx] = tempArr;
            }
          }
        }
      }
    })

    await this.__calculateLeaderBoard(newArr);
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

  __calculateLeaderBoard = async (report) => {
    if (!report) return;
    const today = format(new Date(), 'MMDD');
    const idx = MONTH_OFFSET * Number.parseInt(today.substring(0,2)) + Number.parseInt(today.substring(2))
    const weekReport = _.compact(report.slice(idx-6,idx+1));
    const leaderBoard = {};
    weekReport &&
    weekReport.forEach(week => {
      week.forEach(report => {
        const {id, name, tribe, photoURL, chapter} = report;
        // only calculate chapters
        if (chapter > 0) { 
            if (leaderBoard[id]) {
            leaderBoard[id].chapterCount = leaderBoard[id].chapterCount+1;
            }
            else {
                const userObj = {
                    chapterCount: 1,
                    name,
                    tribe,
                    id,
                    photoURL,
                }
                leaderBoard[id] = userObj;
            }
        }
      });

      const leaderBoardArr = _.chain(leaderBoard)
        .values()
        .sortBy('chapterCount')
        .reverse()
        .value();
      this.setState({leaderBoard: leaderBoardArr});
    })
  }

  switchView = (evt) => {
    const view = evt.currentTarget.dataset.view;
    const modifiedView = view.toUpperCase();
    this.setState({currentView: modifiedView});
  }

  render() {

    const {auth, group} = this.props;
    const { showModal, readSocialFeed, leaderBoard, currentView } = this.state;

    const today = format(new Date(), 'MMDD');
    const idx = MONTH_OFFSET * Number.parseInt(today.substring(0,2)) + Number.parseInt(today.substring(2));
    const weekReport = _.reverse(readSocialFeed.slice(idx-6,idx+1));
    const leaderChapterCount = leaderBoard &&
      leaderBoard.length > 0 &&
      leaderBoard[0].chapterCount;

    return (
      <div className="social">
        <div className="social__container">
          <div className="social__wrapper">
            <div className="social__leaderwall">
              <div className="social__overview">
                <div className="social__tab social__tab--active" data-view="weekly">Weekly</div>
                <div className="social__tab" data-view="all">All Time</div>
                <div className="social__tab" data-view="tribe">Tribes</div>
              </div>
              <div className="social__header">Weekly Leaders of {group.title}</div>
              {leaderBoard &&
                leaderBoard.map((member, idx)=> {
                  const {name, chapterCount, id, photoURL, streak} = member;
                  const count = streak && streak.current || 0;
                  
                  const photoURI = photoURL
                    ? photoURL
                    : auth && auth.uid === id
                      ? auth.photoURL
                      : null;
                  return (
                  <div key={member.id} className="social__leaderboard">
                    {
                      photoURI
                      ? <img className="social__whoami" src={photoURI} alt={name} />
                      : <svg className="social__whoami feather feather-smile"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                    }
                    <div className="social__status">
                      <div className="social__whoName">
                        <span className="social__lead">{idx+1}.</span>
                        <span className="social__name">{name} <img src={star} className="social__star" alt="streak"/>{count}</span>
                        <span className="social__chaptercount">{chapterCount} <span className="social__chapter">chapters</span></span>
                      </div>
                      <div className="social__bar" style={{width: `${chapterCount/leaderChapterCount * 100}%`}}></div>
                    </div>
                  </div>
                  )
                })}
            </div>
          </div>
          <div className="social__wrapper">
            <div className="social__groups">
              {group &&
              group.members &&
              group.members.map(member => {
                const memberId = member.id;
                const modifiedMember = _.omit(member, ['tribe', 'id']);
                const memberName = _.keys(modifiedMember)[0];
                return <div className="social__member" key={memberId}>{memberName}</div>
              })}
            </div>
            <div className="social__cards">
              {
                weekReport &&
                group &&
                group.members &&
                weekReport.map((report, idx)=>{
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
                </ul>
              </div>
            </div>
            {/* <button className="social__createGroup" onClick={this.__toggleModal}>+ Create Group</button> */}
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
