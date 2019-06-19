import React, { Component } from 'react';
import meta from '../../configs/bible.json';
import Book from '../Book/Book';

export default class PreSelection extends Component {

  state = {
    bible : [],
  }

  componentDidMount() {
    this.setState({bible: meta});
  }

  render() {
    const { bible } = this.state;
    return (
      <div className="setup_wrapper">
        <div className="setup__header">Awesome, you're ahead!</div>
        <div className="setup__subheader">Select all the chapters you've already finished reading.</div>
        {
          bible &&
          bible.meta &&
          bible.meta.length > 0 &&
          bible.meta.map((bibleBook) => {
            if (bibleBook !== null) {
              const {id, book, chapterProgress} = bibleBook;
              return <Book key={id} name={book} chapters={chapterProgress} id={id} isSetup={true} />
            }
            return null;
          })
        }
      </div>
    )
  }
}
