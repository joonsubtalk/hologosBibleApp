import React, { Component } from 'react'
import { connect } from 'react-redux';
import Chapter from '../Chapter/Chapter';
import * as actions from '../../actions';

class Book extends Component {

  state = {
    isHidden: true
  }

  clickBookHandler = () => {
    const {isHidden} = this.state;

    this.setState({isHidden: !isHidden});
  }

  render() {
    const {name, chapters, id, read} = this.props;
    const {isHidden} = this.state;
    const additionalClass = !isHidden
      ? 'book--reveal'
      : '';
    const totalChaptersRead = read && read[id] && Object.keys(read[id]).length;
    const progress = totalChaptersRead > 0
      ? `${totalChaptersRead}/${chapters.length}`
      : '';

    return (
      <div className={`book ${additionalClass}`}>
        <div className="book__container">
          <div className="book__header" onClick={this.clickBookHandler}>
            <div className="book__indicator"></div>
    <div className="book__name">{name} {!!progress && (<><span className="book__icon"></span> <span className="book__progress">{progress}</span></>)}</div>
          </div>
          { !isHidden &&
            <div className="book__books">
              {
                chapters.map((chapter, idx)=>{
                  const hasRead = read && read[id] && read[id][chapter];
                  return <Chapter key={idx} chapter={chapter} book={name} bid={id} hasRead={hasRead}/>
                })
              }
            </div>
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
