import React, { Component } from 'react'
import Chapter from '../Chapter/Chapter';

export default class Book extends Component {

  state = {
    isHidden: true
  }

  clickBookHandler = () => {
    const {isHidden} = this.state;
    this.setState({isHidden: !isHidden});
  }

  render() {
    const {name, chapters} = this.props;
    const {isHidden} = this.state;
    const additionalClass = !isHidden
      ? 'book--reveal'
      : '';
    return (
      <div className={`book ${additionalClass}`}>
        <div className="book__container">
          <div className="book__header" onClick={this.clickBookHandler}>
            <div className="book__indicator"></div>
            <div className="book__name">{name} </div>
          </div>
          <div className="book__books">
            {
              chapters.map((chapter, idx)=>{
                return <Chapter key={idx} chapter={chapter} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
