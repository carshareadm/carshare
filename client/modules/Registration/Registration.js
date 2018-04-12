//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import styles from "./Registration.css";
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

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      mobile: "",
      license: "",
      registered: false,

      touched: {
        email: false,
        password1: false,
        password2: false,
        mobile: false,
        license: false,
      },
    };
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  //Set up variables for Msgs

  labels = {
    email: "Email",
    mobile: "Mobile Phone",
    license: "Drivers License Number",
    password1: "Password",
    password2: "Confirm Password",
  };

  errorMsgs = {
    email: "a valid email is required",
    mobile: "a valid mobile phone number is required",
    license: "required",
    password1:
      "must be minimum 8 characters with 1 uppercase, 1 lowercase and 1 number",
    password2: "must match password",
  };

  errors = {};

  validate() {
    // true means invalid, so our conditions got reversed
    const errs = {
      email: !validator.isEmail(this.state.email),
      mobile: !validator.isMobilePhone(this.state.mobile, "en-AU"),
      license: this.state.license.length < 1,
      password1: !this.state.password1.match(
        /^$|^((\d)|[a-z]|[A-Z]|[^A-Z]){8,}$/
      ),
      password2: this.state.password1 != this.state.password2,
    };
    return errs;
  }

  componentDidMount() {
    if (storage.get(storage.Keys.JWT)) this.setState({ registered: true });
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

  handlePassword2Change = evt => {
    this.setState({ password2: evt.target.value });
  };

  handleLicenseChange = evt => {
    this.setState({ license: evt.target.value });
  };

  handleMobileChange = evt => {
    this.setState({ mobile: evt.target.value });
  };

  handleSubmit(evt) {
    if (this.isFormInvalid()) {
      evt.preventDefault();
      return;
    } else {
      evt.preventDefault();
      http
        .client()
        .post("/account/register", {
          email: this.state.email,
          mobile: this.state.mobile,
          license: this.state.license,
          password: this.state.password1,
        })
        .then(res => {
          storage.set(storage.Keys.JWT, res.data.token);
          this.setState({ registered: true });
        })
        .catch(err => console.log(err));
    }
    //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
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
    return this.state.registered ? this.registered() : this.registerFrm();
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
  registerFrm() {
    this.errors = this.validate();
    const isDisabled = this.isFormInvalid();

    return (
      <div className={styles.body}>
        <Container>
          <Row />
          <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col xs="12" sm="6">
                <h1>&nbsp;</h1>
                <h4 className={styles.h4}>Problems with registration?</h4>
                <p>
                  Please contact us via the telephone numbers listed below or
                  the <Link to="/contact">contact page</Link>.
                </p>
                <h4 className={styles.h4}>Customer Services</h4>
                <p>Services available 7am - 7pm</p>
                <p className={styles.phoneNum}>1300 000 123</p>
              </Col>
              <Col xs="12" sm="6">
                <h1 className={styles.title}>Registration</h1>
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
                  {this.renderLabel("password1", "password1")}
                  <Input
                    name="password1"
                    id="password1"
                    className={this.isError("password1") ? "is-invalid" : ""}
                    type="password"
                    placeholder="Enter Password"
                    onBlur={() => this.handleBlur("password1")}
                    value={this.state.password1}
                    onChange={this.handlePassword1Change.bind(this)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  {this.renderLabel("password2", "password2")}
                  <Input
                    name="password2"
                    id="password2"
                    className={this.isError("password2") ? "is-invalid" : ""}
                    type="password"
                    placeholder="Confirm Password"
                    onBlur={() => this.handleBlur("password2")}
                    value={this.state.password2}
                    onChange={this.handlePassword2Change.bind(this)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  {this.renderLabel("license", "license")}
                  <Input
                    name="license"
                    id="license"
                    className={this.isError("license") ? "is-invalid" : ""}
                    type="text"
                    placeholder="Enter License"
                    onBlur={() => this.handleBlur("license")}
                    value={this.state.license}
                    onChange={this.handleLicenseChange.bind(this)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  {this.renderLabel("mobile", "mobile")}
                  <Input
                    name="mobile"
                    id="mobile"
                    className={this.isError("mobile") ? "is-invalid" : ""}
                    type="text"
                    placeholder="Enter Mobile"
                    onBlur={() => this.handleBlur("mobile")}
                    value={this.state.mobile}
                    onChange={this.handleMobileChange.bind(this)}
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
                  className={styles.wideBtn}
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

export default Registration;
