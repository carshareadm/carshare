//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

import stylesMain from "../../main.css";

//Faq component class
export class Unauthorised extends Component {
  render() {
    // Here goes our page
    return (
      <div className={stylesMain.body}>
        <h1 className={stylesMain.title}>Unauthorised</h1>

        <p>          
          <Link to="/">Back to home.</Link>          
        </p>
      </div>
    );
  }
}

export default Unauthorised;
