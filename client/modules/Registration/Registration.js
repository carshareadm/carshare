//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import styles from './Registration.css'

var validator = require('validator');

//Create a component class

function validate(email, password1, password2, mobile, license) {
    // true means invalid, so our conditions got reversed
    return {
      email: !validator.isEmail(email),
      password1: password1.length === 0,
      password2: password1 !== password2,
      mobile: !validator.isMobilePhone(mobile,'en-AU'),
      license: license.length === 0,
    };
  }

export class Registration extends Component {

    constructor() {
        super();
        this.state = {
          email: '',
          password1: '',
          password2: '',
          mobile: '',
          license: '',
          
          everFocusedEmail: false,
          everFocusedPassword1: false,
          everFocusedPassword2: false,
          everFocusedMobile: false,
          everFocusedLicense: false,
          inFocus: '',
        };
      }
      
      handleEmailChange = (evt) => {
        this.setState({ email: evt.target.value });
      }
      
      handlePassword1Change = (evt) => {
        this.setState({ password1: evt.target.value });
      }

      handlePassword2Change = (evt) => {
        this.setState({ password2: evt.target.value });
      }

      handleLicenseChange = (evt) => {
        this.setState({ license: evt.target.value });
      }

      handleMobileChange = (evt) => {
        this.setState({ mobile: evt.target.value });
      }
      
      handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
          evt.preventDefault();
          return;
        }
        const { email, password, mobile, license } = this.state;
        alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
      }
      
      canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password1, this.state.password2, this.state.mobile, this.state.license);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

  render() {
    
    const errors = validate(this.state.email, this.state.password1, this.state.password2, this.state.mobile, this.state.license);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Registration</h1>
            <p><strong>Registration Form</strong><br /></p>
            <form onSubmit={this.handleSubmit}>
                <label className={styles.labels} for="email">
                    <div className={styles.labelText}>Email *</div>
                    <input className={errors.email ? "error" : ""} type="text" placeholder="Enter Email"
                     value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label className={styles.labels} for="licence">
                    <div className={styles.labelText}>Driver Licence *</div>
                    <input className={errors.license ? "error" : ""} type="text" placeholder="Enter License Number"
                     value={this.state.license} onChange={this.handleLicenseChange} />
                </label>
                <label className={styles.labels} for="mobile">
                    <div className={styles.labelText}>Mobile *</div>
                    <input className={errors.mobile ? "error" : ""} type="text" placeholder="Enter Mobile"
                     value={this.state.mobile} onChange={this.handleMobileChange} />
                </label>
                <label className={styles.labels} for="password">
                    <div className={styles.labelText}>Password *</div>
                    <input className={errors.password1 ? "error" : ""} type="password" placeholder="Enter Password"
                     value={this.state.password1} onChange={this.handlePassword1Change} />
                </label>
                <label className={styles.labels} for="password">
                    <div className={styles.labelText}>Confirm Password *</div>
                    <input className={errors.password2 ? "error" : ""} type="password" placeholder="Repeat Password"
                     value={this.state.password2} onChange={this.handlePassword2Change} />
                </label>
        <button disabled={isDisabled}>Register</button>
            </form>
            <p><strong>Problems with registration?</strong><br/>Please contact us via the telephone numbers listed below or the <Link to="/register">contact page</Link>.</p>
            <p><strong>Customer Services</strong><br />
            Services available 7am - 7pm</p>
            <p className={styles.phoneNum}>1300 000 123</p>
        </div>
    );
  }
}

export default Registration;