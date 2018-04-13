//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import styles from "./Login.css";
import arrows from "../Layout/angle-double-right.svg.png";

import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
} from "reactstrap";

import * as http from "../../util/http";

var validator = require("validator");

const storage = require("../../util/persistedStorage");

//Create a component class

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      LoggedIn: false,

      touched: {
        email: false,
        password: false,
      },
    };
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  //Set up variables for Msgs

  labels = {
    email: "Email",
    password: "Password",
  };

  errorMsgs = {
    email: "a valid email is required",
  };

  errors = {};

  validate() {
    // true means invalid, so our conditions got reversed
    const errs = { email: !validator.isEmail(this.state.email) };
    return errs;
  }

  componentDidMount() {
    if (storage.get(storage.Keys.JWT)) this.setState({ loggedIn: true });
  }

  handleBlur(field) {
    this.setState({
      touched: Object.assign({}, this.state.touched, { [field]: true }),
    });
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePassword1Change = evt => {
    this.setState({ password1: evt.target.value });
  };

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.isFormInvalid()) {
      return;
    } else {
      http
        .client()
        .post("/account/login", {
          email: this.state.email,
          password: this.state.password1,
        })
        .then(res => {
          storage.set(storage.Keys.JWT, res.data.token);
          this.setState({ LoggedIn: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  renderLabel(key, labelFor) {
    if (this.isError(key)) {
      return (
        <Label htmlFor={labelFor} className={"text-danger"}>
          {this.labels[key]}: {this.errorMsgs[key]}
        </Label>
      );
    }
    return (
      <Label htmlFor={labelFor} className={styles.label}>
        {this.labels[key]}
      </Label>
    );
  }

  isError(key) {
    const errorExists = this.errors[key];
    const touched = this.state.touched[key] === true;
    return errorExists && touched;
  }

  render() {
    return this.state.LoggedIn ? this.registered() : this.LoginFrm();
  }
  registered() {
    return (
      <div className={styles.body}>
        <h1 className={styles.title}>Registered</h1>
        <p>
          <Link to="/profile">Click here to go to user profile</Link>
          <br />
        </p>
      </div>
    );
  }
  LoginFrm() {
    this.errors = this.validate();
    const isDisabled = this.isFormInvalid();

    return (
      <div className={styles.body}>
        <Container>
          <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col xs="12" sm="6">
                <img className={styles.btnarrows} src={arrows} />
                <Link to="/register">
                  <Button outline color="success" className={styles.regBtn}>
                    Register
                  </Button>
                </Link>
              </Col>
              <Col xs="12" sm="6">
                <h1 className={styles.title}>Login</h1>
                <FormGroup>
                  {this.renderLabel("email", "email")}
                  <Input
                    name="email"
                    id="email"
                    className={this.isError("email") ? "is-invalid" : ""}
                    type="text"
                    placeholder="Enter Email"
                    onBlur={() => this.handleBlur("email")}
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  {this.renderLabel("password", "password")}
                  <Input
                    name="password"
                    id="password"
                    className={this.isError("password") ? "is-invalid" : ""}
                    type="password"
                    placeholder="Enter Password"
                    onBlur={() => this.handleBlur("password")}
                    value={this.state.password1}
                    onChange={this.handlePassword1Change.bind(this)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" />
              <Col xs="12" sm="6">
                <img className={styles.btnarrows} src={arrows} />
                <Button
                  disabled={isDisabled}
                  outline
                  color="success"
                  className={styles.loginBtn}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    );
  }
}

export default Login;
