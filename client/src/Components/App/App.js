import React, { Component } from 'react';
import ToDoList from '../ToDoList/ToDoList';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Welcome from '../Welcome/Welcome';
import Settings from '../Settings/Settings';
import requireAuth from '../Auth/requireAuth';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import Navbar from '../Navbar/Navbar';

const NavWithRouter = withRouter(Navbar);
class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Route exact path='/' component={Login} />
          <Route path='/app' component={requireAuth(ToDoList)} />
          <Route exact path='/welcome' component={Welcome} />
          <Route exact path='/home' component={requireAuth(Home)} />
          <Route exact path='/settings' component={requireAuth(Settings)} />
          <NavWithRouter />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
