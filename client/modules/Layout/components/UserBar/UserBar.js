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
  Label,
  Form,
} from "reactstrap";

// Import Style
import styles from "./UserBar.css";

export class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsVisible: false,
      loggedIn: false,
      email: "",
      password1: "",
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
      formIsVisible: !this.state.formIsVisible,
    });
  }

  handlePassword1Change = evt => {
    this.setState({ password1: evt.target.value });
  };

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
        <Form inline style={{ display: this.state.formIsVisible ? "block" : "none" }}
          onSubmit={this.executeLogin}>
        
        <Row>
        <FormGroup> 
        <Col xs="8" sm="4"/>
          <Col className={styles.logincol}>
          <Label className={styles.labels} htmlFor="login">
              Email
              <Input type="text" name="login" id="login" />
              </Label>
          </Col>
          </FormGroup>
          <FormGroup>
          <Col>
            <Label className={styles.labels} htmlFor="password">
              Password
            <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.password1}
                    onChange={this.handlePassword1Change.bind(this)}
                    required
                  />
                  </Label>
            </Col>
            </FormGroup>
            <FormGroup>
            <Col>
            <Button className={styles.buttons} color="primary" size="sm">
              Log in
            </Button>
          </Col>
          </FormGroup>
        </Row>
        </Form>
      </div>
    );
  }

  render() {
    return this.state.loggedIn ? this.loggedInBar() : this.loginFrm();
  }
}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object,
};

export default UserBar;
