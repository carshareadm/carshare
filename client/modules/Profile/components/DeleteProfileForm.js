/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React, { Component, PropTypes } from "react";
import DeleteProfile from './DeleteProfile';

// this is a wrapper class purely because cant seem to get redux to map props
// for a compnent rendered as a route rather than included as jsx
export class DeleteProfileForm extends Component {
  render() {
    return (<DeleteProfile />);
  }
}

export default DeleteProfileForm;