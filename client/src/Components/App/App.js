import React, { Component } from "react";
import ToDoList from "../ToDoList/ToDoList";
import Login from "../Login/Login";
import requireAuth from "../Auth/requireAuth";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route path="/app" component={requireAuth(ToDoList)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
