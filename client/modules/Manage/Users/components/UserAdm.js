/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React, { Component, PropTypes } from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Loading from '../../../Loading/Loading';
import LicenseAdm from './LicenseAdm';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

const validator = require("validator");

export class UserAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {...this.props.user},
      license: {},
      updatedLicense: null,
      isTouched: {
        email: false,
        mobile: false,
        isDisabled: false,
        license: false,
      },
      dropdownsOpen: {
        isDisabled: false,
      },
    }
  }
  
  labels = {
    email: "Email",
    mobile: "Mobile",
  };

  errors = {};

  errorMsgs = {
    email: "a valid email is required",
    mobile: "a valid mobile phone number is required",
  };

  validate() {
    const errs = {
      email: !validator.isEmail(this.state.user.email),
      mobile: !validator.isMobilePhone(this.state.user.mobile, "en-AU"),
    };
    return errs;
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
    return <Label htmlFor={labelFor} >{this.labels[key]}</Label>
  }

  handleBlur(field) {
    this.setState({
      isTouched: Object.assign({}, this.state.isTouched, { [field]: true }),
    });
  }

  handleInputChange(evt)
  {
    let field = evt.target.id;
    let value = evt.target.value
    this.setState({
      user: { ...this.state.user, [field]: value },
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  componentDidMount() {
    manageSvc.licenses.getById(this.state.user.license._id)
    .then(res => this.setState({license: res.data}))
    .catch(e => console.log(e));
  }

  renderTextFormGroup(field) {
    const placeholder = this.labels[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <Input
          type="text"
          name={field}
          id={field}
          placeholder={placeholder}
          className={this.isError(field) ? 'is-invalid' : ''}
          onChange={this.handleInputChange.bind(this)}
          onBlur={() => this.handleBlur(field)}
          value={this.state.user[field]}
        />
      </FormGroup>
    );
  }

  toggleDropDown(field, evt) {
    const dropdownState = {...this.state.dropdownsOpen};
    dropdownState[field] = !dropdownState[field];
    this.setState({dropdownsOpen: dropdownState});
  }

  ddOnSelect(field, value, evt) {
    this.setState({
      user: {...this.state.user, [field]: value},
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},

    });
  }

  disabledDropDown() {
    const field = 'isDisabled';
    const active = 'ACTIVE';
    const disabled = 'INACTIVE';
    const text = this.state.user.isDisabled ? disabled : active;
    
    const opts = [
      {state: false, text: active},
      {state: true, text: disabled},
    ].map(m => (<DropdownItem key={m.text} onClick={(e) => this.ddOnSelect(field, m.state, e)}>{m.text}</DropdownItem>));
    
    return (
      <FormGroup>
          {this.renderLabel(field, field)} <br />
          <ButtonDropdown isOpen={this.state.dropdownsOpen[field]} toggle={(e) => this.toggleDropDown(field, e)}>            
            <DropdownToggle caret size="sm">{text}</DropdownToggle>
            <DropdownMenu>
              {opts}
            </DropdownMenu>
          </ButtonDropdown>          
      </FormGroup>
    );
  }

  submit(evt) {
    evt.preventDefault()
    this.setLoading(true);
    const user = this.state.user;
    if (this.state.updatedLicense && this.state.updatedLicense.isInvalid === false) {
      user.license.licenseNumber = this.state.updatedLicense.licenseNumber;
      user.license.approvedByAdmin = this.state.updatedLicense.approvedByAdmin;
    }

    manageSvc.users.updateUser(user)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(user);
    })
    .catch(e => {
      this.setLoading(false);
      console.log(e)
    });
  }

  async handleLicenseChanged (evt) {
    console.log(evt)
    await this.setState({
      ...this.state,
      isTouched: { license: true },
      updatedLicense: evt,
    })
  }

  saveButton(isDisabled) {
    return isDisabled
      ? <Button color="primary" disabled>Save</Button> 
      : <Button color="primary" onClick={(e) => this.submit(e)}>Save</Button>;

  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading})
  }

  renderLicense() {
    return !this.state.license.id
    ? ''
    : <Col xs="12" md="6">
        <LicenseAdm
            licenseNumber={this.state.license.licenseNumber}
            imageUrl={this.state.license.imageUrl}
            approvedByAdmin={this.state.license.approvedByAdmin}
            onChanged={(e) => this.handleLicenseChanged(e)}/>

        <hr />
      </Col>    
  }

  render() {
    this.errors = this.validate();
    const formIsDisabled = this.isFormInvalid() || (this.state.updatedLicense && this.state.updatedLicense.isInvalid);
    const loading = this.state.isLoading ? <Loading /> : '';
    return (
      <Row>
        {loading}
        {this.renderLicense()}
        <Col xs="12" md="6">
          <h5>User</h5>
          {this.disabledDropDown()}
          {this.renderTextFormGroup('email')}
          {this.renderTextFormGroup('mobile')}

          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

UserAdm.propTypes = {
  user: PropTypes.object.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default UserAdm;