//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  setLoggedIn,
  setLoggedOut,
  setAdmin,
} from "../../infrastructure/AuthActions";

import styles from "./Login.css";
import stylesMain from "../../main.css";
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
import TokenUtils from "../../util/token.utils";

var validator = require("validator");

//Create a component class

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      touched: { email: false },
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

  handleSubmit = evt => {
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
          TokenUtils.setToken(res.data.token);
          const adm = TokenUtils.isAdmin(TokenUtils.token());
          console.log(this);
          this.props.setLoggedIn();
          this.props.setAdmin(adm);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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
      <Label htmlFor={labelFor} className={stylesMain.label}>
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
    return this.props.loggedIn ? this.registered() : this.LoginFrm();
  }

  registered() {
    return (
      <div className={stylesMain.bodyFullPage}>
        <h1 className={stylesMain.title}>Registered</h1>
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
      <div className={stylesMain.bodyFullPage}>
        <Container>
          <form className={stylesMain.form} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col>
                <h1 className={stylesMain.title}>Login</h1>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 12 }} md={{ size: 8 }} lg={{ size: 6 }}>
                <img className={stylesMain.btnarrows} src={arrows} />
                <Link to="/register">
                  <Button type="button" outline color="success" className={stylesMain.wideBtn}>
                    Register
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 12 }} md={{ size: 8 }} lg={{ size: 6 }}>
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
                    id="password_1"
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.password1}
                    onChange={this.handlePassword1Change.bind(this)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 12 }} md={{ size: 8 }} lg={{ size: 6 }}>
                <img className={stylesMain.btnarrows} src={arrows} />
                <Button
                  disabled={isDisabled}
                  outline
                  color="success"
                  className={stylesMain.wideBtn}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    );
  }
}

// redux mapping stuff
// Login.propTypes = {
//   loggedIn: PropTypes.bool.isRequired,
// };

const mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //dispatch,
      setLoggedIn,
      setLoggedOut,
      setAdmin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
