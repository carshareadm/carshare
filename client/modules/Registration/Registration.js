//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import styles from './Registration.css'

import * as http from "../../util/http";

var validator = require('validator');

const storage = require('../../util/persistedStorage');

//Create a component class

function validate(email, password1, password2, mobile, license) {
    // true means invalid, so our conditions got reversed
    return {
      email: !validator.isEmail(email),
      password1: !validator.matches(password1, "^((\d)|[a-z]|[A-Z]|[^A-Z]){8,}$"),
      password2: password1 !== password2,
      mobile: !validator.isMobilePhone(mobile,'en-AU'),
      license: license.length === 0,
    };
  }

export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password1: '',
          password2: '',
          mobile: '',
          license: '',
          registered: false,
          
          touched: {
            email: false,
            password1: false,
            password2: false,
            mobile: false,
            license: false,
          }, 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canBeSubmitted = this.canBeSubmitted.bind(this);
      }

      componentDidMount() {
        if(storage.get(storage.Keys.JWT))
        this.setState({	registered:true });
        }
      
      handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
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
      
      handleSubmit(evt){
        if (!this.canBeSubmitted()) {
          evt.preventDefault();
          return;
        }
        else{
          evt.preventDefault();
          http.client().post('/account/register', {
            email: this.state.email,
            mobile: this.state.mobile,
            license: this.state.license,
            password: this.state.password1,
          })
          .then(res => {
            console.log(res);
            this.setState({registered: true});
          })
          .catch(err => console.log(err));
        }
        //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
      }
      
      canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password1, this.state.password2, this.state.mobile, this.state.license);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

  render() {
    return this.state.registered ? this.registered() : this.registerFrm()
  }
  registered()
  {
    return(
    <div className={styles.body}>
            <h1 className={styles.title}>Registered</h1>
            <p><Link to="/profile">Click here to go to user profile</Link><br /></p>
    </div>);
  }
  registerFrm(){

    const errors = validate(this.state.email, this.state.password1, this.state.password2, this.state.mobile, this.state.license);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };
    
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Registration</h1>
            <p><strong>Registration Form</strong><br /></p>
            <form onSubmit={this.handleSubmit}>
                <label className={styles.labels} htmlFor="email">
                    <div className={styles.labelText}>Email *</div>
                    <input className={shouldMarkError('email') ? styles.error : ""} type="text" placeholder="Enter Email"
                    onBlur={this.handleBlur('email')}
                     value={this.state.email} onChange={this.handleEmailChange} />
                     <p className={shouldMarkError('email') ? styles.error : ""}>Please enter a valid email</p>
                </label>
                <label className={styles.labels} htmlFor="licence">
                    <div className={styles.labelText}>Driver Licence *</div>
                    <input className={shouldMarkError('license') ? styles.error : ""} type="text" placeholder="Enter License Number"
                     value={this.state.license} onChange={this.handleLicenseChange}
                     onBlur={this.handleBlur('license')} />
                     <p className={shouldMarkError('license') ? styles.error : ""}>Please enter a valid license number</p>
                </label>
                <label className={styles.labels} htmlFor="mobile">
                    <div className={styles.labelText}>Mobile *</div>
                    <input className={shouldMarkError('mobile') ? styles.error : ""} type="text" placeholder="Enter Mobile"
                     value={this.state.mobile} onChange={this.handleMobileChange} 
                     onBlur={this.handleBlur('mobile')} />
                     <p className={shouldMarkError('mobile') ? styles.error : ""} >Please enter a valid mobile</p>
                </label>
                <label className={styles.labels} htmlFor="password">
                    <div className={styles.labelText}>Password *</div>
                    <input className={shouldMarkError('password1') ? styles.error : ""} type="password" placeholder="Enter Password"
                     value={this.state.password1} onChange={this.handlePassword1Change}
                     onBlur={this.handleBlur('password1')} />
                     <p className={shouldMarkError('password1') ? styles.error : ""}>Password should be at least 8 digits</p>
                </label>
                <label className={styles.labels} htmlFor="password">
                    <div className={styles.labelText}>Confirm Password *</div>
                    <input className={shouldMarkError('password2') ? styles.error : ""} type="password" placeholder="Repeat Password"
                     value={this.state.password2} onChange={this.handlePassword2Change} 
                     onBlur={this.handleBlur('password2')} />
                     <p className={shouldMarkError('password2') ? styles.error : ""}>Please ensure passwords match</p>
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