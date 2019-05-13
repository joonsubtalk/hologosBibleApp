import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import * as actions from '../../actions';

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.throttledChapterToggle = throttle(this.throttledChapterToggle.bind(this), 750)
  }

  handleChapterToggle = evt => {
    const { upsertChapterRead, removeChapterRead, hasRead, auth, chapter, bid } = this.props;
    evt.preventDefault();

    if (hasRead) {
      removeChapterRead(bid, chapter, auth.uid);
    } else {
      const date = new Date();
      const timestamp = date.getTime();

      upsertChapterRead({
        timestamp: timestamp
      }, bid, chapter, auth.uid);
    }
  };

  throttledChapterToggle = (evt) => {
    this.clearTimer();
    this.setTimer(evt);
  }

  setTimer = (evt) => {
    if (this.timerHandle) {
      return;
    }
    this.handleChapterToggle(evt);
    this.timerHandle = setTimeout(()=>{
      this.timerHandle = 0;
    }, 500);
  }

  clearTimer = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const {chapter, hasRead} = this.props;
    const modifiedClassName = hasRead
      ? 'chapter chapter--isRead'
      : 'chapter';
    return (
      <div className={modifiedClassName}>
        <div className="chapter__container" onClick={this.throttledChapterToggle}>
          <div className="chapter__number">
            {chapter}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth,
  };
};

export default connect(mapStateToProps, actions)(Chapter);
