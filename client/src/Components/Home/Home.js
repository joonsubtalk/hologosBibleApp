import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Analytics from '../Analytics/Analytics';
import meta from '../../configs/bible.json';
import Loader from '../Loader/Loader';
import Book from '../Book/Book';

class Home extends Component {

  state = {
    bible : [],
  }

  componentDidMount() {
    this.loadBible(meta);
    this.props.fetchBookChapterRead(this.props.auth.uid);
  }

  loadBible = (data) => {
    this.setState({bible: meta});
  }

  render() {
    const { bible } = this.state;
    const {auth, profile} = this.props;
    const finishedLoading = !!(bible && auth);
    return (
      <div className="home">
        <div className="home__container">
          {
            finishedLoading && <Analytics />
          }
          {
            finishedLoading
            ?
            (
            bible &&
            bible.meta &&
            bible.meta.length > 0 &&
            bible.meta.map((bibleBook) => {
              if (bibleBook !== null) {
                const {id, book, chapterProgress} = bibleBook;
                return <Book key={id} name={book} chapters={chapterProgress} id={id} />
              }
              return null;
            }))
            : (<Loader />)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile,
  };
};

export default connect(mapStateToProps, actions)(Home);
