//Import react
import React, { Component, PropTypes } from "react";

import Login from './Login';

// this is a wrapper class purely because cant seem to get redux to map props
// for a compnent rendered as a route rather than included as jsx
export class LoginForm extends Component {
  render() {
    return (<Login />);
  }
}

export default LoginForm;