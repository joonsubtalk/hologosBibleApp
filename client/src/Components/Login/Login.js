import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import { FACEBOOK, GOOGLE } from '../../configs/constants'
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import Welcome from "../Welcome/Welcome";

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.history.push('/home')
    }
  }

  render() {
    const { signIn, auth } = this.props;
    return (
      <div className="login">
        <div className="login__container">
          {auth !== null
            ? <Loader />
            : (
            <>
              <Welcome/>
              <div className="login__buttons">
                <button className="login__facebookBtn" onClick={(facebook)=>signIn(FACEBOOK)}>
                  Login with Facebook
                </button>
                <button className="login__googleBtn" onClick={(google)=>signIn(GOOGLE)}>
                  Login with Google
                </button>
              </div>
              <div className="login__disclaimer">
                We don't post anything to Facebook.
              </div>
            </>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Login);
