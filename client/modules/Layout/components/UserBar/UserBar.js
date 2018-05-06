import React, { Component, PropTypes } from "react";
import router, { Link, Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  setLoggedIn,
  setLoggedOut,
  setAdmin,
} from "../../../../infrastructure/AuthActions";

import * as http from "../../../../util/http";
import * as storage from "../../../../util/persistedStorage";
import TokenUtils from "../../../../util/token.utils";


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
import Search from '../Header/components/Search';

export class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsVisible: false,
      email: "",
      password1: "",
      redirectToHome: false,
    };

    //Bind the function to the class
    this.formToggle = this.formToggle.bind(this);
    this.executeLogin = this.executeLogin.bind(this);
  }

  componentDidMount() {}

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
                <Link className={styles.barItem_link} to="/history">
                  <Button className={styles.buttons} color="primary" size="sm">
                    History
                  </Button>
                </Link>
                &nbsp;
              </ButtonGroup>
              <ButtonGroup>
                <Button className={styles.buttons} color="primary" size="sm">
                  Log Out
                </Button>
                &nbsp;
              </ButtonGroup>
              <ButtonGroup>
              <Search />
              </ButtonGroup>
            </ButtonGroup>
          </span>
          <Search />
        </form>
      </div>
    );
  }

  logout(event) {
    TokenUtils.clearToken();
    this.setState({ loggedIn: false, redirectToHome: true });
    //router.replace('/login');
    this.props.setLoggedOut();
    this.props.setAdmin(false);
  }

  executeLogin(event) {
    event.preventDefault();
    const login = document.getElementById("login").value;
    const pass = document.getElementById("password").value;

    http
      .client()
      .post("/account/login", { email: login, password: pass })
      .then(res => {
        TokenUtils.setToken(res.data.token);
        const adm = TokenUtils.isAdmin(TokenUtils.token());
        this.props.setLoggedIn();
        this.props.setAdmin(adm);
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
        <Row style={{ display: this.state.formIsVisible ? "block" : "none" }}>
          <br />
          <Col xs={{ size: 8, offset: 2 }}
               md={{ size: 6, offset: 3 }}
               lg={{ size: 4, offset: 4 }}>
            <FormGroup>
                <Input type="text" name="login" id="login" placeholder="Enter Email"/>
            </FormGroup>
          </Col>
          <Col xs={{ size: 8, offset: 2 }}
               md={{ size: 6, offset: 3 }}
               lg={{ size: 4, offset: 4 }}>
            <FormGroup>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password1}
                  onChange={this.handlePassword1Change.bind(this)}
                  required
                />
            </FormGroup>
          </Col>
          <Col xs={{ size: 8, offset: 2 }}
               md={{ size: 6, offset: 3 }}
               lg={{ size: 4, offset: 4 }}>
            <FormGroup>
              <Button
                onClick={this.executeLogin}
                className={styles.buttons}
                color="primary"
                size="sm"
              >
                Log in
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

  renderRedirect() {
    return <Redirect to="/login" />;
  }

  render() {
    return this.state.redirectToHome
      ? this.renderRedirect()
      : this.props.loggedIn
        ? this.loggedInBar()
        : this.loginFrm();
  }
}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object,
};

// redux mapping stuff
UserBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
