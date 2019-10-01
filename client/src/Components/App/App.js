import React, { Component } from 'react';
import Home from '../Home/Home';
import Social from '../Social/Social';
import Badges from '../Badges/Badges';
import Login from '../Login/Login';
import Welcome from '../Welcome/Welcome';
import Settings from '../Settings/Settings';
import Setup from '../Setup/Setup';
import requireAuth from '../Auth/requireAuth';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchProfile, fetchBookChapterRead, insertProfilePic } from '../../actions';
import Navbar from '../Navbar/Navbar';

const NavWithRouter = withRouter(Navbar);
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth && this.props.auth !== prevProps.auth) {
      this.props.fetchProfile(this.props.auth.uid);
      this.props.fetchBookChapterRead(this.props.auth.uid);
    }
    if (prevProps.read !== this.props.read && this.props.auth) {
      this.props.fetchBookChapterRead(this.props.auth.uid);
    }
    // if (this.props.profile !== prevProps.profile) {
    //   if (this.props.profile && !this.props.profile.photoURL) {
    //     this.props.insertProfilePic(this.props.auth.uid, this.props.auth.photoURL);
    //   }
    // }
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Route exact path='/' component={Login} />
          <Route exact path='/welcome' component={Welcome} />
          <Route path='/setup/:pid' component={requireAuth(Setup)} />
          <Route exact path='/home' component={requireAuth(Home)} />
          <Route exact path='/badges' component={requireAuth(Badges)} />
          <Route exact path='/social' component={requireAuth(Social)} />
          <Route exact path='/settings' component={requireAuth(Settings)} />
          <NavWithRouter />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile
  };
};

export default connect(mapStateToProps, { fetchUser, fetchProfile, fetchBookChapterRead, insertProfilePic })(App);
