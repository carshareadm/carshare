//Import react
import React, { Component, PropTypes } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router";
import * as http from "../../util/http";
import * as licenseService from '../../services/license.service';
import * as confirmService from '../../services/confirm.service';
import Confirmation from '../Confirmation/Confirmation';

import * as validator from "validator";
import styles from "./Profile.css";
import stylesMain from '../../main.css';

import FileUploader from '../FileUploader/FileUploader';
import Loading from '../Loading/Loading';
import placeholderImg from './ic_image.svg';

const storage = require("../../util/persistedStorage");

//Profile component class
export class Profile extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      // loading state
      isLoading: false,
      loadingMsg: '',      
      // user profile deets
      userid: '',
      email: '',
      mobile: '',
      license: '', // this is actually the id of the license in the db
      password: '',
      street1: '',
      street2: '',
      suburb: '',
      state: '',
      postCode: '',
      // license deets
      licenseImageUrl: '',
      licenseNumber: '',
      multipleUpdate: false,
      // page state
      statesDropdownOpen: false,
      isTouched: {
        email: false,
        mobile: false,
        licenseNumber: false,
        profilePassword: false,
        street1: false,
        street2: false,
        suburb: false,
        state: false,
        postCode: false,
      },
      // confirmation codes
      codes: {
        isRequested: false,
        deliveryMethod: '',
        confirmed: false,
      },
    };
  }

  auStates = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

  labels = {
    email: 'Email',
    mobile: 'Mobile Phone',
    licenseNumber: 'Drivers License Number',
    password: 'Password',
    street1: 'Street 1',
    street2: 'Street 2',
    suburb: 'Suburb',
    state: 'State',
    postCode: 'Postcode',
  };

  errorMsgs = {
    email: 'a valid email is required',
    mobile: 'a valid mobile phone number is required',
    licenseNumber: 'required',
    password: 'must be minimum 8 characters with 1 uppercase, 1 lowercase and 1 number',
    street1: 'required',
    suburb: 'required',
    state: 'required',
    postCode: 'a 4 digit postcode is required',
  };

  errors = { };

  validate() {
    // true means invalid, so our conditions got reversed
    const errs = {
      email: !validator.isEmail(this.state.email),
      mobile: !validator.isMobilePhone(this.state.mobile, "en-AU"),
      licenseNumber: this.state.licenseNumber.length < 1,
      password: !this.state.password.match(/^$|^((\d)|[a-z]|[A-Z]|[^A-Z]){8,}$/),
      street1: this.state.street1.length < 5,
      suburb: this.state.suburb.length < 2,
      state: this.auStates.indexOf(this.state.state) < 0,
      postCode: !this.state.postCode.match(/^\d{4}$/),
      multiple: (this.state.password.length > 0  && this.state.mobile.length > 0) 
      || (this.state.password.length > 0  && this.state.mobile.length > 0) 
      || (this.state.email.length > 0  && this.state.mobile.length > 0) 
      || (this.state.password.length > 0  && this.state.email.length > 0),
    };
    return errs;
  }

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  handleMobileChange = (evt) => {
    this.setState({ mobile: evt.target.value });
  }

  handleLicenseChange = (evt) => {
    this.setState({ licenseNumber: evt.target.value });
  }

  handleStreet1Change = (evt) => {
    this.setState({ street1: evt.target.value });
  }

  handleSuburbChange = (evt) => {
    this.setState({ suburb: evt.target.value });
  }

  handleStreet2Change = (evt) => {
    this.setState({ street2: evt.target.value });
  }

  handlePostCodeChange = (evt) => {
    this.setState({ postCode: evt.target.value });
  }

  handleStateChange(event) {
    this.setState({
      state: event.target.innerText,
      statesDropdownOpen: false,
    });
    this.handleBlur('state');
  }

  toggleStatesDropdown() {
    this.setState({
      statesDropdownOpen: !this.state.statesDropdownOpen,
    });
    this.handleBlur('state');
  }

  handleBlur(field) {
    this.setState({
      isTouched: Object.assign({}, this.state.isTouched, { [field]: true }),
    });
  }

  handleLicenseUploaded(image) {
    licenseService.updateImageDetails(this.state.license, image._id)
      .then(res => {
        this.loadLicense();
      })
      .catch(e => console.log(e));
  }

  requiresConfirmation() {
    // have any sensitive fields been updated?
    if (this.state.isTouched.email === true || 
        this.state.isTouched.mobile  === true || 
        this.state.isTouched.licenseNumber === true) {

        // have we been through confirmation process yet?
        if (this.state.codes.isRequested === false || this.state.codes.confirmed === false) {
          return true;
        }
    }
    // no sensitive fields updated OR confirmation already done
    return false;
  }

  setIsLoading(isLoading, message) {
    this.setState({
      isLoading: isLoading,
      loadingMsg: isLoading ? message : '',
    });
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.requiresConfirmation()) {
      // require confirmation before proceeding
      this.requestConfirmationCode();
    } else {
      this.setIsLoading(true, 'Saving updates...');
      http.client().post('/profile/', {
        user: this.state.userid,
        email: this.state.isTouched['email'] ? this.state.email : null,
        mobile: this.state.isTouched['mobile'] ? this.state.mobile : null,
        license: this.state.isTouched['licenseNumber'] ? this.state.licenseNumber : null,
        password: this.state.isTouched['profilePassword'] ? this.state.password : null,
        street1: this.state.isTouched['street1'] ? this.state.street1 : null,
        street2: this.state.isTouched['street2'] ? this.state.street2 : null,
        suburb: this.state.isTouched['suburb'] ? this.state.suburb : null,
        state: this.state.isTouched['state'] ? this.state.state : null,
        postCode: this.state.isTouched['postCode'] ? this.state.postCode : null,
      })
      .then(res => {
        this.setIsLoading(false, '');
        const codes = {
          isRequested: false,
          deliveryMethod: '',
          confirmed: false,
        };
      })
      .catch(err => {
        this.setIsLoading(false, '');
        console.log(err);
      });
    }
  }

  requestConfirmationCode() {
    if (this.state.isTouched['mobile']) {
      this.requestCode(confirmService.VerificationTypes.EMAIL);
    } else {
      this.requestCode(confirmService.VerificationTypes.SMS);
    }
  }

  isError(key) {
    const errorExists = this.errors[key];
    const touched = this.state.isTouched[key] === true;
    return errorExists && touched;
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  renderLabel(key, labelFor) {
    if (this.isError(key)) {
      return <Label htmlFor={labelFor} className={'text-danger'}>{this.labels[key]}: {this.errorMsgs[key]}</Label>
    }
    return <Label htmlFor={labelFor} className={styles.label}>{this.labels[key]}</Label>
  }

  renderImage() {
    if(this.state.licenseImageUrl && this.state.licenseImageUrl.length > 0) {
      return (<img src={this.state.licenseImageUrl} />);
    }
    return (<img src={placeholderImg} />);
  }

  /********* confirmation code stubs *********/
  requestCode(by) {
    const codes = {
      isRequested: true,
      deliveryMethod: by,
      confirmed: false,
    };
    this.setIsLoading(true, `Requesting a confirmation code via ${by}`);    confirmService.requestConfirmationCode(by, confirmService.CodeTypes.ACCOUNT_UPDATE)
    .then(() => {
      this.setIsLoading(false, '');
      this.setState({codes: codes});
    })
    .catch(e => {
      console.log(e);
      this.setIsLoading(false, '');
    });
  }

  /**
   * for rendering the Confirmation page
   * @param {*} deliveryMethod VerificationTypes.EMAIL || VerificationTypes.SMS
   */
  renderConfirm(deliveryMethod)
  {
    return(
      <Confirmation
        codeType={confirmService.CodeTypes.ACCOUNT_UPDATE}
        onCodeConfirmed={this.handleCodeConfirmed.bind(this)}
        verificationMethod={deliveryMethod}
      ></Confirmation>
    );
  }

  handleCodeConfirmed() {
    this.setState({codes: {confirmed: true}});
    this.handleSubmit(null);
  }

  render() {
    return this.state.codes.isRequested && !this.state.codes.confirmed ? 
      this.renderConfirm(this.state.codes.deliveryMethod) : this.profileFrm()
  }

  profileFrm()
  {

    this.errors = this.validate();
    /*
    Placeholder. isDisabled will be reviewed later to improve implementation
    and enable the save button on a case by case validation bases
    depending on which fields are touched
    */
    const isDisabled = false;
    this.state.multipleUpdate=this.isError('multiple');

    const load = this.state.isLoading ? (<Loading msg={this.state.loadingMsg}></Loading>) : '';
  
  return (
    <div className={stylesMain.body}>
      {load}
      <Container>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Profile</h1>
          </Col>
        </Row>
        <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        <Row>
            <Col xs="12" sm="6">
              <hr />
              <h4 className={stylesMain.h4}>License</h4>
              <div className={styles.imgContainer}>
                {this.renderImage()}
              </div>
              <FileUploader
                onFileUploaded={this.handleLicenseUploaded.bind(this)}
                isPublic={false} />
            <h4 className={stylesMain.h4}>License image changes will be processed by ShaCar staff shortly.</h4>
            <hr />
            <Link
              className={styles.wideBtn + " btn btn-success"}
              to="/paymentDetails"
            >
              Payment Details
            </Link>
          </Col>
          <Col xs="12" sm="6">
              <hr />
              <h4 className={stylesMain.h4}>Address Details</h4>

              <FormGroup>
                {this.renderLabel("street1", "street1")}
                <Input
                  type="text"
                  name="street1"
                  id="street1"
                  placeholder="Street 1"
                  className={this.isError('street1') ? 'is-invalid' : ''}
                  onChange={this.handleStreet1Change.bind(this)}
                  onBlur={() => this.handleBlur('street1')}
                  value={this.state.street1}
                />
              </FormGroup>

              <FormGroup>
                {this.renderLabel("street2", "street2")}
                <Input
                  type="text"
                  name="street2"
                  id="street2"
                  placeholder="Street 2"
                  onChange={this.handleStreet2Change.bind(this)}
                  value={this.state.street2}
                />
              </FormGroup>

              <FormGroup>
                {this.renderLabel("suburb", "suburb")}
                <Input
                  type="text"
                  name="suburb"
                  id="suburb"
                  placeholder="Suburb"
                  className={this.isError('suburb') ? 'is-invalid' : ''}
                  onChange={this.handleSuburbChange.bind(this)}
                  onBlur={() => this.handleBlur('suburb')}
                  value={this.state.suburb}
                />
              </FormGroup>

              <FormGroup>
                {this.renderLabel("state", "state")}
                <Dropdown
                  isOpen={this.state.statesDropdownOpen}
                  toggle={this.toggleStatesDropdown.bind(this)}
                >
                  <DropdownToggle caret>
                    {this.state.state.length > 0
                      ? this.state.state
                      : "Select State"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.auStates.map(x => (
                      <DropdownItem
                        key={x}
                        onClick={this.handleStateChange.bind(this)}
                      >
                        {x}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>

              <FormGroup>
                {this.renderLabel("postCode", "postcode")}
                <Input
                  type="text"
                  name="postcode"
                  id="postcode"
                  placeholder="Postcode"
                  className={this.isError('postCode') ? 'is-invalid' : ''}
                  onChange={this.handlePostCodeChange.bind(this)}
                  onBlur={() => this.handleBlur('postCode')}
                  value={this.state.postCode}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col xs="12" sm="6">
              <hr />
              <h4 className={stylesMain.h4}>User Details</h4>
              <FormGroup>
                {this.renderLabel("mobile", "mobile")}
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile Phone"
                  className={this.isError('mobile') ? 'is-invalid' : ''}
                  onChange={this.handleMobileChange.bind(this)}
                  onBlur={() => this.handleBlur('mobile')}
                  value={this.state.mobile}
                />
              </FormGroup>
              <FormGroup>
                {this.renderLabel("licenseNumber", "licenseNumber")}
                <Input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  placeholder="Drivers License Number"
                  className={this.isError('licenseNumber') ? 'is-invalid' : ''}
                  onChange={this.handleLicenseChange.bind(this)}
                  onBlur={() => this.handleBlur('licenseNumber')}
                  value={this.state.licenseNumber}
                />
              </FormGroup>
              <FormGroup>
                {this.renderLabel("email", "email")}
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={this.isError('email') ? 'is-invalid' : ''}
                  onChange={this.handleEmailChange.bind(this)}
                  onBlur={() => this.handleBlur('email')}
                  value={this.state.email}
                />
              </FormGroup>
              <FormGroup>
                {this.renderLabel("password", "profilePassword")}
                <Input
                  type="password"
                  name="profilePassword"
                  id="profilePassword"
                  placeholder="Update Password"
                  className={this.isError('password') ? 'is-invalid' : ''}
                  onChange={this.handlePasswordChange.bind(this)}
                  onBlur={() => this.handleBlur('profilePassword')}
                  value={this.state.password}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button disabled={isDisabled} outline color="success" className={styles.wideBtn}>
                Save
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

  mapUserToModel(user) {
    if(user) {
      this.setState({
        email: user.email ? user.email : '',
        mobile: user.mobile ? user.mobile : '',
        license: user.license || '',
        street1: user.address && user.address.street1 ? user.address.street1 : '',
        street2: user.address && user.address.street2 ? user.address.street2 : '',
        suburb: user.address && user.address.suburb ? user.address.suburb : '',
        state: user.address && user.address.state ? user.address.state : '',
        postCode: user.address && user.address.postCode ? user.address.postCode : '',
      });
    }
  }

  loadLicense() {
    http.client().get('/license/' + this.state.license)
      .then(res => {
        this.setState({
          //licenseImageUrl: res.data.imageUrl,
          licenseNumber: res.data.licenseNumber,
        });
        this.preLoadImage(res.data.imageUrl);
      })
      .catch(e => console.log(e));
  }

  preLoadImage(imageUrl) {
    if (imageUrl && imageUrl.length > 0) {
      this.setState({licenseImageUrl: ''}); 
      const img = new Image();
      img.onload = () => {
        this.setState({licenseImageUrl: imageUrl});  
      };
      img.src = imageUrl;
    }
  }

  componentDidMount() {
    const token = storage.get(storage.Keys.JWT);
  	if(token)
	  {
		  this.setState({	
			  userid: JSON.parse(atob(token.split('.')[1]))['sub'],
  		});
	  }
    console.log(this.state.userid);
    http
      .client()
      .get("/profile/my")
      .then(res => {
        this.mapUserToModel(res.data);
        this.loadLicense();
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Profile;
