import React, { Component } from 'react'
import data from '../../configs/bible.json';
import Book from '../Book/Book';

export default class Home extends Component {

  state = {
    bible : [],
  }

  componentDidMount() {
    this.loadBible(data);
  }

  loadBible = (data) => {
    this.setState({bible: data});
  }

  render() {
    const { bible } = this.state;
    return (
      <div className="home">
        <div className="home__container">
          {
            bible &&
            bible.meta &&
            bible.meta.length > 0 &&
            bible.meta.map((bibleBook) => {
              if (bibleBook !== null) {
                const {id, book, chapterProgress} = bibleBook;
                return <Book key={id} name={book} chapters={chapterProgress}/>
              }
              return null;
            })
          }
        </div>
      </div>
    )
  }
}
