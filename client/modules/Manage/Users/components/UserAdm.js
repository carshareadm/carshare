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
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

export class UserAdm extends Component {

  yearOptions = [];

  stateOptions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
  doorsOptions = [2, 3, 4, 5];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {...this.props.user},
      isTouched: {
        email: false,
        mobile: false,
        isDisabled: false,
        isAccountConfirmed: false,
        isBlockedByAdmin: false,
        isAdm: false,
        model: false,
        year: false,
        colour: false,
        seats: false,
        doors: false,
        vehicleType: false,
        location: false,
      },
      dropdownsOpen: {
        isDisabled: false,
        isAccountConfirmed: false,
        isBlockedByAdmin: false,
        isAdm: false,
        year: false,
        seats: false,
        doors: false,
        location: false,
        vehicleType: false,
      },
    }


    const minYear = 2000;
    const maxYear = (new Date()).getFullYear();
    for(var i = minYear; i < maxYear; i++) {
      this.yearOptions.push(i);
    }
  }
  
  labels = {
    email: 'Email',
    mobile: 'Mobile',
    isDisabled: 'Disabled',
    isAccountConfirmed: 'Confirmed',
    isBlockedByAdmin: 'Blocked',
    isAdmin: 'Admin Access',
    state: 'State',
  };

  errors = {};

  errorMsgs = {
    email: 'is required',
    mobile: 'is required',
    isDisabled: '',
    isAccountConfirmed: '',
    isBlockedByAdmin: '',
    isAdmin: '',
    state: 'is required',
  };

  validate() {
    // Placeholder validation for now
    const errs = {
      email: this.state.user.email.length < 1,
      mobile: this.state.user.mobile.length < 1,
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

  renderDropdownFormGroup(field, options, isAddress) {

    const opts = options.map(m => (<DropdownItem key={m} onClick={(e) => this.ddOnSelect(field, m, e)}>{m}</DropdownItem>));
    var text = '';
    console.log(this.state.user);
    if(isAddress){
      text = this.state.user.address[field];
    }
    else
    {
      text = this.state.user[field];
    }
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

  //tf - True False drop down
  tfDropDown(field, check) {
    const active = 'No';
    const disabled = 'Yes';
    const text = check ? disabled : active;
    
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

  renderObjectDropDown(field, options) {
    const opts = options.map(m => (
        <DropdownItem key={m._id} onClick={(e) => this.ddOnSelect(field, m, e)}>{m.name}</DropdownItem>
      )
    );
    const text = this.state.user[field] ? this.state.user[field].email : `Select ${this.labels[field]}`;
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

    manageSvc.users.updateUser(this.state.user)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(this.state.user);
    })
    .catch(e => {
      this.setLoading(false);
      console.log(e)
    });
  }

  saveButton(isDisabled) {
    return isDisabled
      ? <Button color="primary" disabled>Save</Button> 
      : <Button color="primary" onClick={(e) => this.submit(e)}>Save</Button>;

  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading})
  }

  render() {
    this.errors = this.validate();
    const formIsDisabled = this.isFormInvalid();
    const loading = this.state.isLoading ? <Loading /> : '';
    return (
      <Row>
        {loading}
        <Col xs="12" md="6">
          {this.renderTextFormGroup('email')}
          {this.renderTextFormGroup('mobile')}
          {this.tfDropDown('isAccountConfirmed', this.state.user.isAccountConfirmed)}
          {this.tfDropDown('isAdmin', this.state.user.isAdmin)}
        </Col>
        <Col xs="12" md="6">
          {this.tfDropDown('isDisabled', this.state.user.isDisabled)}
          {this.tfDropDown('isBlockedByAdmin', this.state.user.isBlockedByAdmin)}
          {this.renderTextFormGroup('model')}
          {this.renderObjectDropDown('vehicleType', this.props.vehicleTypes, false)}
          {this.renderTextFormGroup('colour')}
          {this.renderDropdownFormGroup('year', this.yearOptions, false)}
          {this.renderDropdownFormGroup('state', this.stateOptions, true)}
          {this.renderDropdownFormGroup('doors', this.doorsOptions, false)}

          {this.renderObjectDropDown('location', this.props.locations)}

          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

UserAdm.propTypes = {
  user: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  vehicleTypes: PropTypes.array.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default UserAdm;