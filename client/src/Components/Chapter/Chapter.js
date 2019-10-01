import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import {subMilliseconds} from 'date-fns';
import {SIMPLE_BIBLE} from '../../configs/constants';

class Chapter extends Component {

  handleAreYouSure = (bid, chapter, uid) => {
    this.props.removeChapterRead(bid, chapter, uid);
    this.props.toggleBookCompletion(uid, {[bid] : null});
  }

  handleChapterToggle = evt => {
    const { upsertChapterRead, setStreak, hasRead, auth, chapter, bid, read } = this.props;
    evt.preventDefault();

    if (hasRead) {
      this.handleAreYouSure(bid, chapter, auth.uid);
    } else {
      const date = new Date();
      const timestamp = date.getTime();

      upsertChapterRead({
        timestamp: timestamp
      }, bid, chapter, auth.uid);

      // check if this is the last chapter before a book is done!
      const {chapters, book} = SIMPLE_BIBLE.meta[bid];
      if (chapters === 1 || chapters - 1 === _.compact(this.props.read[bid]).length) {
        this.props.toggleBookCompletion(auth.uid, {[bid] : subMilliseconds(timestamp, 100).getTime()});
      }
    }
  };

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
        <div className="chapter__container" onClick={this.handleChapterToggle}>
          <div className="chapter__number">
            {chapter}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, auth, read }) => {
  return {
    data,
    auth,
    read,
  };
};

export default connect(mapStateToProps, actions)(Chapter);
