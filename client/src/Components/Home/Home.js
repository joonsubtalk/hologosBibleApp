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
    showMain : false,
    revealTimer : () => {},
  }

  componentDidMount() {
    this.loadBible(meta);
    this.props.fetchBookChapterRead(this.props.auth.uid);
    this.revealMainTimer();
    if (this.props.profile){this.setState({showMain: true})}
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.profile){
    //   if (prevProps.profile.username !== this.props.profile.username) {

    //   }
    // }
    if (prevProps.profile !== this.props.profile) {
      if (this.props.profile === null || this.props.profile.username === undefined){
        clearTimeout(this.state.revealTimer);
        this.props.history.push('/setup/1')
      }
    }
  }

  revealMainTimer = () => {
    const self = this;
    const timer = setTimeout(() => { self.setState({showMain: true}) }, 3000);
    this.setState({revealTimer : timer});
  }

  loadBible = (data) => {
    this.setState({bible: meta});
  }

  render() {
    const { bible, showMain } = this.state;
    const {auth, profile} = this.props;
    const finishedLoading = showMain && !!(bible && auth && profile);
    return (
      <div className="home">
        <div className="home__container">
          {
            finishedLoading && <Analytics />
          }
          {
            !finishedLoading
            ? (<Loader />)
            :
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
