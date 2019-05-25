import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Modal from '../Modal/Modal';

class Social extends Component {

  state = {
    showModal: false,
  }

  // uuidv4 = () => {
  //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  //   )
  // }

  componentDidMount() {
    if (this.props.profile && this.props.profile.groups && this.props.profile.groups[0]) {
      this.props.fetchGroup(this.props.profile.groups[0])
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile) {
      this.props.fetchGroup(this.props.profile.groups[0])
    }
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

    const {auth, profile, group} = this.props;
    const { showModal } = this.state;

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
                group.title
              }
              <div className="social__card">
                <ul>
                  <li></li>
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
