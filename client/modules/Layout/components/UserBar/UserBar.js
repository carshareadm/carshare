import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

import * as http from "../../../../util/http";
import * as storage from "../../../../util/persistedStorage";

import {
  Button,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// Import Style
import styles from "./UserBar.css";

export class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsVisible: false,
      loggedIn: false
    };

    //Bind the function to the class
    this.formToggle = this.formToggle.bind(this);
    this.executeLogin = this.executeLogin.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem("JWT")) {
      this.setState({ loggedIn: true });
    }
  }

  formToggle() {
    this.setState({
      formIsVisible: !this.state.formIsVisible
    });
  }

  loggedInBar() {
    return (
      <div className={styles.bar}>
        <form onSubmit={this.logout.bind(this)}>
          <span className={styles.barItem}>
            <ButtonGroup>
              <ButtonGroup>
                <Link className={styles.barItem_link} to="/profile">
                  <Button className={styles.buttons} color="primary" size="sm">
                    Profile
                  </Button>
                </Link>
                &nbsp;
              </ButtonGroup>
              <ButtonGroup>
                <Button className={styles.buttons} color="primary" size="sm">
                  History
                </Button>
                &nbsp;
              </ButtonGroup>
              <ButtonGroup>
                <Button className={styles.buttons} color="primary" size="sm">
                  Log Out
                </Button>
                &nbsp;
              </ButtonGroup>
            </ButtonGroup>
          </span>
        </form>
      </div>
    );
  }

  logout(event) {
    /*
    http
      .client()
      .post("/account/login", { email: login, password: pass })
      .then(res => {
        storage.set(storage.Keys.JWT, res.data.token);
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.log(err);
	  });
	  */
    window.localStorage.removeItem("JWT");
    this.setState({ loggedIn: false });
  }

  executeLogin(event) {
    event.preventDefault();
    const login = document.getElementById("login").value;
    const pass = document.getElementById("password").value;

    http
      .client()
      .post("/account/login", { email: login, password: pass })
      .then(res => {
        storage.set(storage.Keys.JWT, res.data.token);
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginFrm() {
    return (
      <div className={styles.bar}>
        <h4>
          <span className={styles.barItem} onClick={this.formToggle}>
            Login
          </span>
          {this.state.formIsVisible ? null : (
            <span className={styles.barItem}>
              &nbsp;or&nbsp;
              <Link className={styles.barItem_link} to="/register">
                Register
              </Link>
            </span>
          )}
        </h4>
        <form
          style={{ display: this.state.formIsVisible ? "block" : "none" }}
          onSubmit={this.executeLogin}
        >
          <FormGroup>
            <Label className={styles.Labels} htmlFor="login">
              <div className={styles.LabelText}>Login</div>
              <Input type="text" name="login" id="login" />
            </Label>
            <Label className={styles.Labels} htmlFor="password">
              <div className={styles.LabelText}>Password</div>
              <Input type="password" name="password" id="password" />
            </Label>
            <Button className={styles.buttons} color="primary" size="sm">
              Log in
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }

  render() {
    return this.state.loggedIn ? this.loggedInBar() : this.loginFrm();
  }
}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object
};

export default UserBar;
