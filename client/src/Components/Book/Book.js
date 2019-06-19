import React, { Component } from 'react'
import { connect } from 'react-redux';
import Chapter from '../Chapter/Chapter';
import _ from 'lodash';
import * as actions from '../../actions';

class Book extends Component {

  state = {
    isHidden: true,
    hasRead: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.read !== this.props.read) {
      if (this.props.read && this.props.read[this.props.id]) {
        this.setState({hasRead: _.compact(this.props.read[this.props.id]).length === this.props.chapters.length})
      }
    }
  }


  clickBookHandler = () => {
    const {isHidden} = this.state;

    this.setState({isHidden: !isHidden});
  }

  markBookComplete = (evt) => {
    const {auth, id, chapters} = this.props;
    let chapterObj = {};

    evt.preventDefault();
    chapters.forEach((chapterId)=>{
      chapterObj[chapterId] = {timestamp: -1}
    })

    this.props.setBookComplete(auth.uid, id, chapterObj)
  }

  render() {
    const {name, chapters, id, read, isSetup} = this.props;
    const {isHidden, hasRead} = this.state;
    const additionalClass = `${isHidden ? '' : 'book--reveal'} ${hasRead ? 'book--read' : ''}`;
    const totalChaptersRead = read && read[id] && Object.keys(read[id]).length;
    const progress = totalChaptersRead > 0
      ? `${totalChaptersRead}/${chapters.length}`
      : '';


    return (
      <div className={`book ${additionalClass}`}>
        <div className="book__container">
          <div className="book__header" onClick={this.clickBookHandler}>
            <div className="book__indicator"></div>
            <div className="book__name">{name} {!!progress && (<><span className="book__icon"></span> <span className="book__progress">{hasRead ? 'Finished' : progress}</span></>)}</div>
          </div>
          { !isHidden &&
            <>
              {isSetup && !hasRead && <button onClick={this.markBookComplete} className="book__markall">Mark all read</button>}
              <div className="book__books">
                {
                  chapters.map((chapter, idx)=>{
                    const hasRead = read && read[id] && read[id][chapter];
                    return <Chapter key={idx} chapter={chapter} book={name} bid={id} hasRead={hasRead}/>
                  })
                }
              </div>
            </>
          }
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

export default connect(mapStateToProps, actions)(Book);
